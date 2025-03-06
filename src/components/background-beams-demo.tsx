
"use client";
import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { HoverButton } from "@/components/ui/hover-button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "@/hooks/use-mobile";

function BackgroundBeamsDemo() {
  const [counter, setCounter] = useState(56);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        setCounter(prev => prev + 1);
      }
    }, 300000);

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
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        method: 'POST',
        body: { email, otp }
      });

      if (error) {
        throw new Error(error.message || 'Failed to verify code');
      }

      setEmail("");
      setOtp("");
      setOtpSent(false);
      
      toast({
        title: "Success!",
        description: "Your email has been verified and you've been added to our waitlist!",
      });
      
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
          <div className="text-white/70 max-w-lg mx-auto text-sm md:text-base text-center relative z-10 h-[24px]">
            <Typewriter 
              text="Spots are filling fast. Join now before the waitlist closes!" 
              speed={50}
              loop={true}
              waitTime={2000}
              className="inline-block"
            />
          </div>
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
                className="text-white w-full max-w-md h-[48px] min-h-[48px]"
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
                  className="text-white w-full sm:w-1/2 h-[48px] min-h-[48px]"
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
                  className="text-white/80 w-full sm:w-1/2 bg-transparent h-[48px] min-h-[48px]"
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
