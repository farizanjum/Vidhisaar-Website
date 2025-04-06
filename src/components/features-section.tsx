
"use client";

import React from "react";
import { Box, Lock, Sparkles, Search } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useIsMobile } from "@/hooks/use-mobile";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  image: string;
}

const GridItem = ({ area, icon, title, description, image }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border border-white/10 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 border-white/10 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="flex items-center mb-4">
              <div className="w-fit rounded-lg border border-gray-600 p-2 mr-3">
                {icon}
              </div>
              <img 
                src={image} 
                alt={title} 
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-white/80">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export function FeaturesSection() {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full bg-black py-16 md:py-24 relative z-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-white">
          Features <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">That Matter</span>
        </h2>
        <p className="text-center text-white/80 max-w-2xl mx-auto mb-12 text-base md:text-lg">
          Vidhisaar combines cutting-edge technologies to provide innovative legal solutions that are transparent, unbiased, and accessible.
        </p>
        
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[38rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
            icon={<Box className="h-4 w-4 text-white" />}
            title="AI-Powered Legal Strategy"
            description="Multi-agent system for diverse, unbiased insights."
            image="https://i.imgur.com/wNayxbX.png"
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]"
            icon={<Lock className="h-4 w-4 text-white" />}
            title="Bias Free & Blockchain-Verified"
            description="Transparent, tamper-proof legal analysis with xAI fairness."
            image="https://i.imgur.com/NiHKbG8.png"
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/2/7]"
            icon={<Sparkles className="h-4 w-4 text-white" />}
            title="Smart Docs & Voice AI"
            description="Advanced OCR + voice models focused on Indic languages."
            image="https://i.imgur.com/AQu7lsd.png"
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:2/7/2/13]"
            icon={<Search className="h-4 w-4 text-white" />}
            title="Multi-Lingual & Case Matching"
            description="Supports key Indian languages (Hindi, Tamil, Bengali, Marathi etc.) & finds relevant precedents."
            image="https://i.imgur.com/59tT1gE.png"
          />
        </ul>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_70%)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[20rem] bg-purple-500/20 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
}
