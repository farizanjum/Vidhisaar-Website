
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.32.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://yaaxydqaiktwwztbfdwp.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY");

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

    // Send the OTP via email with improved design
    const emailResult = await resend.emails.send({
      from: "Vidhisaar <no-reply@verification.vidhisaarai.in>",
      to: [email],
      subject: "Your Vidhisaar Waitlist Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333366;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://i.imgur.com/O1msyDo.png" alt="Vidhisaar Logo" style="max-width: 200px; height: auto;">
          </div>
          
          <h2 style="color: #333366; margin-bottom: 16px;">Verify Your Email for Vidhisaar Waitlist</h2>
          
          <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.5;">Thank you for joining the Vidhisaar waitlist! Please use the following verification code to complete your registration:</p>
          
          <div style="background-color: #f4f4f9; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <h1 style="letter-spacing: 8px; font-size: 36px; margin: 0; color: #333366;">${otp}</h1>
          </div>
          
          <p style="margin-bottom: 16px; font-size: 16px; line-height: 1.5;">This code will expire in 15 minutes.</p>
          <p style="margin-bottom: 30px; font-size: 16px; line-height: 1.5;">If you didn't request this code, please ignore this email.</p>
          
          <div style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 30px;">
            <p style="margin-bottom: 16px; font-size: 14px; color: #666;">Connect with us:</p>
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
              <a href="https://www.instagram.com/vidhisaar.ai" style="color: #333366; text-decoration: none;">
                <img src="https://cdn-icons-png.flaticon.com/128/1409/1409946.png" alt="Instagram" style="width: 24px; height: 24px;">
              </a>
              <a href="https://x.com/vidhisaarAI" style="color: #333366; text-decoration: none;">
                <img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="X (Twitter)" style="width: 24px; height: 24px;">
              </a>
              <a href="https://www.linkedin.com/company/vidhisaarai/" style="color: #333366; text-decoration: none;">
                <img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="LinkedIn" style="width: 24px; height: 24px;">
              </a>
            </div>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
            &copy; 2023 Vidhisaar. All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("Email sent:", emailResult);

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
