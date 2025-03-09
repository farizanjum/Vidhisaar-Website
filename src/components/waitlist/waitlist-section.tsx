
"use client";

import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { VerificationForm } from "@/components/waitlist/verification-form";
import { CounterDisplay } from "@/components/waitlist/counter-display";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FixedHoverButton } from "@/components/ui/fixed-hover-button";
import { FAQSection } from "@/components/faq-section";

export function WaitlistSection() {
  const [counter, setCounter] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [alreadyWaitlisted, setAlreadyWaitlisted] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Fetch the waitlist count when the component mounts
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
          .eq('verified', true);
        
        if (error) {
          console.error('Error fetching waitlist count:', error);
          // Default to 56 if there's an error
          setCounter(56);
        } else {
          // Set the actual count or default to 56 if count is null
          setCounter(count || 56);
        }
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
        setCounter(56);
      }
    };

    fetchWaitlistCount();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        setCounter(prev => (prev || 56) + 1);
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
    setCounter(prev => (prev || 56) + 1);
    
    // Reset already waitlisted state
    setAlreadyWaitlisted(false);
  };

  const handleBackToEmail = () => {
    setOtpSent(false);
  };

  const handleAlreadyWaitlisted = () => {
    setAlreadyWaitlisted(true);
  };

  return (
    <div className="bg-[#030303] min-h-screen flex flex-col">
      {/* Hero Section with Gradient Background */}
      <div id="waitlist" className="h-auto min-h-[40rem] w-full bg-[#030303] relative flex flex-col items-center justify-center antialiased px-2 sm:px-4 py-8 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        
        <div className="max-w-2xl mx-auto p-3 sm:p-4 z-10">
          <h1 className="relative z-10 sm:text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#000046] to-[#1cb5e0] text-center font-sans font-bold text-3xl">
            Vidhisaar AI Waitlist
          </h1>
          <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-center font-sans font-bold mt-2 sm:mt-3">
            Limited Spots Available!
          </h2>
          
          <div className="mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-10 md:mb-12">
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
          
          <div className="flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12 z-10 w-full">
            {alreadyWaitlisted ? (
              <div className="text-center">
                <div className="text-white text-xl font-semibold mb-4">
                  You're Already on the Waitlist!
                </div>
                <p className="text-white/80 mb-6">
                  Thank you for your interest! We'll notify you as soon as Vidhisaar is ready.
                </p>
                <FixedHoverButton 
                  className="text-white w-full max-w-md"
                  height="48px"
                  style={{
                    "--circle-start": "#000046",
                    "--circle-end": "#1cb5e0",
                  } as React.CSSProperties}
                  onClick={() => setAlreadyWaitlisted(false)}
                >
                  Back to Form
                </FixedHoverButton>
              </div>
            ) : !otpSent ? (
              <WaitlistForm 
                onSuccess={handleOtpSent} 
                onAlreadyWaitlisted={handleAlreadyWaitlisted} 
              />
            ) : (
              <VerificationForm 
                email={email} 
                onSuccess={handleVerificationSuccess} 
                onBack={handleBackToEmail} 
              />
            )}
            
            {counter !== null && <CounterDisplay counter={counter} />}
          </div>
        </div>
        <BackgroundBeams />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
