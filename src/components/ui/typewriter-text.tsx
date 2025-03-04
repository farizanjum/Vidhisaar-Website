
"use client";

import * as React from "react"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
 
export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
  shiny?: boolean;
}
 
export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = true, // Set default to true for looping
  deleteSpeed = 50,
  delay = 1500,
  className,
  shiny = false,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
 
  // Validate and process input text
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";
 
  useEffect(() => {
    if (!currentText) return;
 
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop || textArrayIndex < textArray.length - 1) {
            // If loop is enabled or there are more texts to display
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            // Move to next text in array or cycle back to first
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );
 
    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    textArray,
    textArrayIndex,
  ]);
 
  return (
    <>
      {shiny ? (
        <motion.span
          className={cn(className, "relative inline-block")}
          initial={{ "--x": "100%" as any }}
          animate={{ "--x": "-100%" as any }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear",
          }}
          style={{
            maskImage:
              "linear-gradient(-75deg,rgba(0,0,0,1) calc(var(--x) + 20%),rgba(0,0,0,0.5) calc(var(--x) + 30%),rgba(0,0,0,1) calc(var(--x) + 100%))",
          } as any}
        >
          {displayText}
          <span className="animate-pulse">{cursor}</span>
        </motion.span>
      ) : (
        <span className={className}>
          {displayText}
          <span className="animate-pulse">{cursor}</span>
        </span>
      )}
    </>
  );
}
