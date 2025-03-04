
"use client";
import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { HoverButton } from "@/components/ui/hover-button";
import { Typewriter } from "@/components/ui/typewriter-text";

function BackgroundBeamsDemo() {
  const [counter, setCounter] = useState(56);

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
          <Input
            type="email"
            placeholder="your@email.com"
            className="w-full max-w-md z-10 mb-4 md:mb-6"
          />
          <HoverButton 
            className="text-white w-full max-w-md"
            style={{
              "--circle-start": "#6344F5",
              "--circle-end": "#18CCFC",
            } as React.CSSProperties}
          >
            Join Waitlist Now
          </HoverButton>
          
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
