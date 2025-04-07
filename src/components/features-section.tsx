
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
    <Card className="relative rounded-2xl border border-gray-800 bg-black p-2 sm:p-3 h-full">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex flex-col h-full overflow-hidden rounded-xl border-[0.75px] border-gray-800 p-5 sm:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="flex justify-center items-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center bg-black rounded-lg p-4">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
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
      imageSrc: "https://i.imgur.com/wNayxbX.png"
    },
    {
      title: "Bias Free & Blockchain-Verified",
      content: "Transparent, tamper-proof legal analysis with xAI fairness.",
      imageSrc: "https://i.imgur.com/NiHKbG8.png"
    },
    {
      title: "Smart Docs & Voice AI",
      content: "Advanced OCR + voice models focused on Indic languages.",
      imageSrc: "https://i.imgur.com/AQu7lsd.png"
    },
    {
      title: "Multi-Lingual & Case Matching",
      content: "Supports key Indian languages (Hindi, Tamil, Bengali, Marathi etc.) & finds relevant precedents.",
      imageSrc: "https://i.imgur.com/59tT1gE.png"
    }
  ];

  return (
    <section className="w-full py-16 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-4xl font-bold mb-16 text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:max-w-6xl mx-auto">
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
