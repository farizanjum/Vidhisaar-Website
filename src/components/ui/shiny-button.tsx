
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
      {...props as any}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-black hover:bg-black/90",
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
        JOIN WAITLIST NOW
      </span>
      <span
        style={{
          mask: "linear-gradient(#fff, #fff) padding-box, linear-gradient(#fff, #fff) border-box",
          maskComposite: "exclude",
        } as any}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.2)_calc(var(--x)+20%),rgba(255,255,255,0.4)_calc(var(--x)+25%),rgba(255,255,255,0.2)_calc(var(--x)+100%))] border border-white/10 p-px"
      ></span>
      <span className="absolute inset-0 z-5 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] opacity-40 blur-[55px]"></span>
    </motion.button>
  );
};
