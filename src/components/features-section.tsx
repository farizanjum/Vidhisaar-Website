
import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FileText, Shield, Speaker, Globe } from "lucide-react";

interface FeatureCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, content, icon }: FeatureCardProps) => {
  return (
    <div className="relative rounded-2xl border border-gray-800 bg-black p-2 sm:p-3 h-full">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative flex flex-col h-full overflow-hidden rounded-xl border-[0.75px] border-gray-800 p-6 sm:p-8 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-black border border-gray-800">
            {icon}
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Legal Strategy",
      content: "Multi-agent system for diverse, unbiased insights.",
      icon: <FileText className="w-8 h-8 text-white" />
    },
    {
      title: "Bias Free & Blockchain-Verified",
      content: "Transparent, tamper-proof legal analysis with xAI fairness.",
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      title: "Smart Docs & Voice AI",
      content: "Advanced OCR + voice models focused on Indic languages.",
      icon: <Speaker className="w-8 h-8 text-white" />
    },
    {
      title: "Multi-Lingual & Case Matching",
      content: "Supports key Indian languages (Hindi, Tamil, Bengali, Marathi etc.) & finds relevant precedents.",
      icon: <Globe className="w-8 h-8 text-white" />
    }
  ];

  return (
    <section className="w-full py-16 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-16 text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              content={feature.content}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
