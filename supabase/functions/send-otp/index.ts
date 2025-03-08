
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.32.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://yaaxydqaiktwwztbfdwp.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

// Initialize the Resend client with the API key
const resend = new Resend(resendApiKey);
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Check if the email is already verified in the waitlist
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .eq('verified', true)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing waitlist entry:", checkError);
    }

    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          alreadyWaitlisted: true, 
          message: "You are already on our waitlist!" 
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the OTP in the database
    const { error: insertError } = await supabase
      .from('otp_codes')
      .insert({
        email,
        code: otp,
      });

    if (insertError) {
      console.error("Error storing OTP:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to generate OTP" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Log before email send for debugging
    console.log("About to send email with Resend using API key:", 
      resendApiKey ? "API key is set" : "API key is NOT set");

    // Send the OTP via email with improved design
    const emailResult = await resend.emails.send({
      from: "Vidhisaar <no-reply@verification.vidhisaarai.in>",
      to: [email],
      subject: "Your Vidhisaar Waitlist Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333366;">
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="https://www.vidhisaarai.in" style="text-decoration: none;">
              <img src="https://i.imgur.com/PpcaA8d.png" alt="Vidhisaar Header" style="max-width: 100%; height: auto;">
            </a>
          </div>
          
          <h2 style="color: #333366; margin-bottom: 16px;">Verify Your Email for Vidhisaar Waitlist</h2>
          
          <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.5;">Thank you for joining the Vidhisaar waitlist! Please use the following verification code to complete your registration:</p>
          
          <div style="background-color: #f4f4f9; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <h1 style="letter-spacing: 8px; font-size: 36px; margin: 0; color: #333366;">${otp}</h1>
          </div>
          
          <p style="margin-bottom: 16px; font-size: 16px; line-height: 1.5;">This code will expire in 15 minutes.</p>
          <p style="margin-bottom: 30px; font-size: 16px; line-height: 1.5;">If you didn't request this code, please ignore this email.</p>
          
          <div style="background-color: #f4f4f9; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="margin-bottom: 12px; font-size: 16px; line-height: 1.5; text-align: center;">While you wait, follow us on social media to stay updated on our progress:</p>
            
            <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 12px;">
              <a href="https://www.instagram.com/vidhisaar.ai" style="color: #333366; text-decoration: none;">
                <img src="https://i.imgur.com/VIExRmr.png" alt="Instagram" style="width: 32px; height: 32px;">
              </a>
              <a href="https://x.com/vidhisaarAI" style="color: #333366; text-decoration: none;">
                <img src="https://i.imgur.com/Ax67KXb.png" alt="X (Twitter)" style="width: 32px; height: 32px;">
              </a>
              <a href="https://www.linkedin.com/company/vidhisaarai/" style="color: #333366; text-decoration: none;">
                <img src="https://i.imgur.com/RGHdieR.png" alt="LinkedIn" style="width: 32px; height: 32px;">
              </a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
              Azamgarh, Uttar Pradesh, India 276121
            </p>
            <p style="font-size: 12px; color: #666;">
              &copy; 2025 Vidhisaar AI. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email send result:", JSON.stringify(emailResult));

    // Check if there was an error with sending the email
    if (emailResult.error) {
      console.error("Error sending email:", emailResult.error);
      return new Response(
        JSON.stringify({ error: "Failed to send verification code" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
