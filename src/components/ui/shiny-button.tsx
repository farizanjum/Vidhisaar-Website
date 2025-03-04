
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
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-[#1C2526] hover:bg-[#1C2526]/90 dark:bg-[radial-gradient(circle_at_50%_0%,#2A3536_0%,#1C2526_60%)]",
        className
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-[#D3D7D9] dark:font-light dark:text-[#D3D7D9]"
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
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(211,215,217,0.2)_calc(var(--x)+20%),rgba(211,215,217,0.4)_calc(var(--x)+25%),rgba(211,215,217,0.2)_calc(var(--x)+100%))] border border-[#3A4546] p-px"
      ></span>
      <span className="absolute inset-0 z-5 rounded-[inherit] bg-gradient-to-br from-[#2A3536] to-[#1C2526] opacity-40"></span>
      <span className="absolute inset-x-0 top-0 z-5 h-[1px] rounded-t-[inherit] bg-gradient-to-r from-transparent via-[rgba(211,215,217,0.1)] to-transparent"></span>
    </motion.button>
  );
};
