
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const scrollToWaitlist = () => {
    // Get the background beams demo section
    const backgroundBeamsSection = document.querySelector(".h-\\[40rem\\].w-full.rounded-md.bg-\\[\\#030303\\]");
    
    if (backgroundBeamsSection) {
      backgroundBeamsSection.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      console.log("Background beams section not found");
    }
  };

  return (
    <motion.button
      initial={{ "--x": "100%" as any, scale: 0.8 }}
      animate={{ "--x": "-100%" as any, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        duration: 2,
        ease: "easeInOut",
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 5,
          mass: 0.5,
        },
      }}
      onClick={scrollToWaitlist}
      {...props as any}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-gradient-to-br from-black/90 to-black hover:from-black/80 hover:to-black overflow-hidden",
        className
      )}
    >
      <span
        className="relative block size-full text-sm font-bold uppercase tracking-wide text-white"
        style={{
          maskImage:
            "linear-gradient(-75deg,rgba(0,0,0,1) calc(var(--x) + 20%),rgba(0,0,0,0.5) calc(var(--x) + 30%),rgba(0,0,0,1) calc(var(--x) + 100%))",
        } as any}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(#000, #000) padding-box, linear-gradient(#000, #000) border-box",
          maskComposite: "exclude",
        } as any}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.2)_calc(var(--x)+20%),rgba(255,255,255,0.4)_calc(var(--x)+25%),rgba(255,255,255,0.2)_calc(var(--x)+100%))] border border-white/30 p-px"
      ></span>
      <span className="absolute inset-0 z-5 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,transparent_70%)] opacity-40 blur-[55px]"></span>
      
      {/* Animated border */}
      <motion.span 
        className="absolute inset-0 z-0 rounded-lg border border-white/30"
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: [0.3, 0.8, 0.3],
          boxShadow: [
            "0 0 0px rgba(255, 255, 255, 0.3)",
            "0 0 10px rgba(255, 255, 255, 0.5)",
            "0 0 0px rgba(255, 255, 255, 0.3)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};
