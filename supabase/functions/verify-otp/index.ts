
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.32.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://yaaxydqaiktwwztbfdwp.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

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
    const { email, otp } = await req.json();
    
    if (!email || !otp) {
      return new Response(
        JSON.stringify({ error: "Email and OTP are required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Check if the OTP is valid and not expired
    const { data: otpData, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', otp)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpError) {
      console.error("Error checking OTP:", otpError);
      return new Response(
        JSON.stringify({ error: "Failed to verify OTP" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    if (!otpData) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired OTP" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Mark the OTP as used
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ used: true })
      .eq('id', otpData.id);

    if (updateError) {
      console.error("Error marking OTP as used:", updateError);
    }

    // Check if the email is already in the waitlist
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing waitlist entry:", checkError);
    }

    let waitlistId;

    if (existingUser) {
      // Update the existing entry
      const { data: updated, error: updateWaitlistError } = await supabase
        .from('waitlist')
        .update({ 
          verified: true,
          verified_at: new Date().toISOString()
        })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (updateWaitlistError) {
        console.error("Error updating waitlist entry:", updateWaitlistError);
        return new Response(
          JSON.stringify({ error: "Failed to update waitlist entry" }),
          { 
            status: 500, 
            headers: { "Content-Type": "application/json", ...corsHeaders } 
          }
        );
      }
      
      waitlistId = existingUser.id;
    } else {
      // Create a new entry
      const { data: inserted, error: insertError } = await supabase
        .from('waitlist')
        .insert({
          email,
          verified: true,
          verified_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error creating waitlist entry:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to add to waitlist" }),
          { 
            status: 500, 
            headers: { "Content-Type": "application/json", ...corsHeaders } 
          }
        );
      }
      
      waitlistId = inserted.id;
    }

    // Log before email send for debugging
    console.log("About to send confirmation email with Resend using API key:", 
      resendApiKey ? "API key is set" : "API key is NOT set");

    // Send confirmation email with improved design
    const emailResult = await resend.emails.send({
      from: "Vidhisaar <no-reply@verification.vidhisaarai.in>",
      to: [email],
      subject: "Welcome to the Vidhisaar Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333366;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://i.imgur.com/O1msyDo.png" alt="Vidhisaar Logo" style="max-width: 200px; height: auto;">
          </div>
          
          <h2 style="color: #333366; text-align: center; margin-bottom: 20px;">You're on the Vidhisaar Waitlist!</h2>
          
          <p style="margin-bottom: 16px; font-size: 16px; line-height: 1.5;">Thank you for joining our waitlist! We're excited to have you as one of our early supporters.</p>
          
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5;">We'll notify you as soon as Vidhisaar is ready for you to explore.</p>
          
          <div style="background-color: #f4f4f9; padding: 24px; border-radius: 8px; margin: 24px 0;">
            <p style="margin-bottom: 16px; font-size: 16px; line-height: 1.5; text-align: center;">While you wait, follow us on social media to stay updated on our progress:</p>
            
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
              <a href="https://www.instagram.com/vidhisaar.ai" style="color: #333366; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <img src="https://cdn-icons-png.flaticon.com/128/1409/1409946.png" alt="Instagram" style="width: 32px; height: 32px;">
                <span style="font-size: 14px;">Instagram</span>
              </a>
              <a href="https://x.com/vidhisaarAI" style="color: #333366; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="X (Twitter)" style="width: 32px; height: 32px;">
                <span style="font-size: 14px;">X (Twitter)</span>
              </a>
              <a href="https://www.linkedin.com/company/vidhisaarai/" style="color: #333366; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="LinkedIn" style="width: 32px; height: 32px;">
                <span style="font-size: 14px;">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5; text-align: center;">We appreciate your interest and can't wait to show you what we're building!</p>
          
          <div style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="font-size: 12px; color: #666;">
              &copy; 2023 Vidhisaar. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email result:", JSON.stringify(emailResult));

    // Check if there was an error with sending the confirmation email
    if (emailResult.error) {
      console.error("Error sending confirmation email:", emailResult.error);
      // We'll still consider the verification successful even if the email fails
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email verified and added to waitlist (confirmation email failed)",
          waitlistId
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email verified and added to waitlist",
        waitlistId
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error in verify-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
