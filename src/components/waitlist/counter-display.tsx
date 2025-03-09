
"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface CounterDisplayProps {
  counter: number;
}

export const CounterDisplay = ({ counter }: CounterDisplayProps) => {
  return (
    <div className="mt-6 md:mt-8 text-center">
      <p className="text-white/70 text-xs md:text-sm relative z-10">
        <span className="font-semibold text-white">{counter}</span> users already signed up – <span className="font-medium text-white animate-pulse">Don't Miss Out!</span>
      </p>
    </div>
  );
};
