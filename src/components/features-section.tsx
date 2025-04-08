
import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  content: string;
  imageSrc: string;
}

const FeatureCard = ({ title, content, imageSrc }: FeatureCardProps) => {
  return (
    <Card className="relative rounded-2xl border border-gray-800 bg-black/60 p-2 sm:p-3 h-full backdrop-blur-lg bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex flex-col h-full overflow-hidden rounded-xl border-[0.75px] border-gray-700/50 p-5 sm:p-6 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] bg-gradient-to-br from-black/80 to-gray-900/40">
        <div className="flex justify-center items-center mb-7">
          <div className="w-28 h-28 flex items-center justify-center rounded-lg">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </Card>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Legal Strategy",
      content: "Multi-agent system for diverse, unbiased insights.",
      imageSrc: "https://i.imgur.com/sYU4dyM.png"
    },
    {
      title: "Bias Free & Blockchain-Verified",
      content: "Transparent, tamper-proof legal analysis with xAI fairness.",
      imageSrc: "https://i.imgur.com/RT8zvgp.png"
    },
    {
      title: "Smart Docs & Voice AI",
      content: "Advanced OCR + voice models focused on Indic languages.",
      imageSrc: "https://i.imgur.com/zOjTrmM.png"
    },
    {
      title: "Multi-Lingual & Case Matching",
      content: "Supports key Indian languages (Hindi, Tamil, Bengali, Marathi etc.) & finds relevant precedents.",
      imageSrc: "https://i.imgur.com/2Ey0q4h.png"
    }
  ];

  return (
    <section className="w-full py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-16 text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 lg:max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              content={feature.content}
              imageSrc={feature.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
