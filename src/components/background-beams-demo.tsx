
"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";

function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Vidhisaar
        </h1>
        <p></p>
        <p className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          AI-driven legal assistant that helps users understand legal concepts, analyze case laws, and provide legal reasoning through an advanced LLM-based system.
        </p>
        <Input
          type="email"
          placeholder="your@email.com"
          className="w-full mt-4 relative z-10"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}

export { BackgroundBeamsDemo };
