
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

    // Send confirmation email
    const emailResult = await resend.emails.send({
      from: "Vidhisaar <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the Vidhisaar Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333366;">You're on the Vidhisaar Waitlist!</h2>
          <p>Thank you for joining our waitlist! We're excited to have you as one of our early supporters.</p>
          <p>We'll notify you as soon as Vidhisaar is ready for you to explore.</p>
          <div style="background-color: #f4f4f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p>While you wait, follow us on social media to stay updated on our progress:</p>
            <div style="display: flex; justify-content: center; gap: 15px; margin-top: 15px;">
              <a href="#" style="color: #333366; text-decoration: none;">Twitter</a>
              <a href="#" style="color: #333366; text-decoration: none;">LinkedIn</a>
              <a href="#" style="color: #333366; text-decoration: none;">Instagram</a>
            </div>
          </div>
          <p>We appreciate your interest and can't wait to show you what we're building!</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            &copy; Vidhisaar. All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent:", emailResult);

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
