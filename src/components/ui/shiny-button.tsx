
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
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-indigo-500/10 hover:bg-indigo-500/20 dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/15%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/15%)]",
        className
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-indigo-950 dark:font-light dark:text-[rgb(255,255,255,95%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,rgba(0,0,0,1) calc(var(--x) + 20%),rgba(0,0,0,0.5) calc(var(--x) + 30%),rgba(0,0,0,1) calc(var(--x) + 100%))",
        } as any}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(#fff, #fff) padding-box, linear-gradient(#fff, #fff) border-box",
          maskComposite: "exclude",
        } as any}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(99,102,241,0.3)_calc(var(--x)+20%),rgba(99,102,241,0.6)_calc(var(--x)+25%),rgba(99,102,241,0.3)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};
