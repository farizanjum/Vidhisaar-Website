
"use client";
import React from "react";

interface CounterDisplayProps {
  counter: number;
}

export const CounterDisplay = ({ counter }: CounterDisplayProps) => {
  return (
    <div className="mt-4 md:mt-6 text-center">
      <p className="text-white/60 text-xs md:text-base relative z-10 animate-pulse">
        <span className="font-semibold text-white/80">{counter}</span> users already signed up – Don't Miss Out!
      </p>
    </div>
  );
};
