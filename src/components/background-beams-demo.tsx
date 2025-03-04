
"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { HoverButton } from "@/components/ui/hover-button";

function BackgroundBeamsDemo() {
  return (
    <div id="waitlist" className="h-[40rem] w-full rounded-md bg-[#030303] relative flex flex-col items-center justify-center antialiased">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      
      <div className="max-w-2xl mx-auto p-4 z-10">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 text-center font-sans font-bold">
          Vidhisaar
        </h1>
        <p></p>
        <p className="text-white/60 max-w-lg mx-auto my-4 text-sm md:text-base text-center relative z-10">
          AI-driven legal assistant that helps users understand legal concepts, analyze case laws, and provide legal reasoning through an advanced LLM-based system.
        </p>
        <div className="flex flex-col items-center justify-center mt-6 z-10">
          <Input
            type="email"
            placeholder="your@email.com"
            className="w-full max-w-md z-10 mb-4"
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
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export { BackgroundBeamsDemo };
