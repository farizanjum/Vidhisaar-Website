"use client";
import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { HoverButton } from "@/components/ui/hover-button";
import { Typewriter } from "@/components/ui/typewriter-text";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

function BackgroundBeamsDemo() {
  const [counter, setCounter] = useState(56);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();

  // Modified to increase counter much more slowly (roughly once per hour)
  useEffect(() => {
    const interval = setInterval(() => {
      // 2% chance to increase counter (roughly once per hour if checked every 5 minutes)
      if (Math.random() < 0.02) {
        setCounter(prev => prev + 1);
      }
    }, 300000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use supabase.functions.invoke with the correct approach
      const { data, error } = await supabase.functions.invoke("send-otp", {
        method: 'POST',
        body: { email }
      });

      if (error) {
        throw new Error(error.message || 'Failed to send verification code');
      }

      setOtpSent(true);
      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the verification code",
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);

    try {
      // Use supabase.functions.invoke with the correct approach
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        method: 'POST',
        body: { email, otp }
      });

      if (error) {
        throw new Error(error.message || 'Failed to verify code');
      }

      // Reset form
      setEmail("");
      setOtp("");
      setOtpSent(false);
      
      toast({
        title: "Success!",
        description: "Your email has been verified and you've been added to our waitlist!",
      });
      
      // Optional: Increase counter for immediate feedback
      setCounter(prev => prev + 1);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };
  
  return (
    <div id="waitlist" className="h-auto min-h-[40rem] w-full rounded-md bg-[#030303] relative flex flex-col items-center justify-center antialiased px-4 py-16 sm:py-0">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      
      <div className="max-w-2xl mx-auto p-4 z-10">
        <h1 className="relative z-10 text-2xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 text-center font-sans font-bold">
          Exclusive Early Access
        </h1>
        <h2 className="relative z-10 text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-center font-sans font-bold mt-3">
          Limited Spots Available!
        </h2>
        <div className="mt-6 md:mt-8 mb-8 md:mb-10 flex justify-center">
          <Typewriter 
            text="Spots are filling fast. Join now before the waitlist closes!" 
            className="text-white/70 max-w-lg mx-auto text-sm md:text-base text-center relative z-10"
            speed={50}
            loop={true}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-8 md:mt-10 z-10">
          {!otpSent ? (
            <>
              <Input
                type="email"
                placeholder="your@email.com"
                className="w-full max-w-md z-10 mb-4 md:mb-6"
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
              />
              <HoverButton 
                className="text-white w-full max-w-md"
                style={{
                  "--circle-start": "#6344F5",
                  "--circle-end": "#18CCFC",
                } as React.CSSProperties}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Join Waitlist Now"}
              </HoverButton>
            </>
          ) : (
            <>
              <div className="text-white/80 text-center mb-4">
                We've sent a verification code to <span className="font-medium">{email}</span>
              </div>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                className="w-full max-w-md z-10 mb-4 md:mb-6"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                disabled={verifying}
              />
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <HoverButton 
                  className="text-white w-full sm:w-1/2"
                  style={{
                    "--circle-start": "#6344F5",
                    "--circle-end": "#18CCFC",
                  } as React.CSSProperties}
                  onClick={handleVerify}
                  disabled={verifying}
                >
                  {verifying ? "Verifying..." : "Verify Code"}
                </HoverButton>
                <HoverButton 
                  className="text-white/80 w-full sm:w-1/2 bg-transparent"
                  style={{
                    "--circle-start": "#6344F5",
                    "--circle-end": "#18CCFC",
                  } as React.CSSProperties}
                  onClick={() => setOtpSent(false)}
                  disabled={verifying}
                >
                  Back
                </HoverButton>
              </div>
            </>
          )}
          
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-white/60 text-xs md:text-base relative z-10 animate-pulse">
              <span className="font-semibold text-white/80">{counter}</span> users already signed up – Don't Miss Out!
            </p>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export { BackgroundBeamsDemo };
