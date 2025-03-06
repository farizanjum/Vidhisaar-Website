"use client";
import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { VerificationForm } from "@/components/waitlist/verification-form";
import { CounterDisplay } from "@/components/waitlist/counter-display";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "@/hooks/use-mobile";

export function WaitlistSection() {
  const [counter, setCounter] = useState(56);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        setCounter(prev => prev + 1);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpSent = (email: string) => {
    setEmail(email);
    setOtpSent(true);
  };

  const handleVerificationSuccess = () => {
    setEmail("");
    setOtpSent(false);
    setCounter(prev => prev + 1);
  };

  const handleBackToEmail = () => {
    setOtpSent(false);
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
        
        <div className="mt-6 md:mt-8 mb-8 md:mb-10">
        <div className="text-[#9F9EA1] text-xs md:text-base text-center z-20">
          {isMobile ? (
            <span>Spots are filling fast. Join now before the waitlist closes!</span>
          ) : (
            <Typewriter 
              text="Spots are filling fast. Join now before the waitlist closes!" 
              speed={50}
              loop={true}
              initialDelay={2000}
              className="inline-block"
            />
          )}
        </div>
      </div>
      
        
        <div className="flex flex-col items-center justify-center mt-8 md:mt-10 z-10">
          {!otpSent ? (
            <WaitlistForm onSuccess={handleOtpSent} />
          ) : (
            <VerificationForm 
              email={email} 
              onSuccess={handleVerificationSuccess} 
              onBack={handleBackToEmail} 
            />
          )}
          
          <CounterDisplay counter={counter} />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
