
import React from "react";
import { BorderBeam } from "@/components/ui/border-beam";

export function PartnersSection() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 overflow-hidden bg-black text-white">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-white relative z-10">Our Partners</h2>
      
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <div className="relative p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative w-full max-w-[300px] aspect-auto">
              <img 
                src="https://i.imgur.com/KLG1rBA.png" 
                alt="Partner Logo" 
                className="w-full h-auto object-contain"
              />
              <BorderBeam size={200} duration={15} delay={3} />
            </div>
            
            <div className="relative w-full max-w-[300px] aspect-auto">
              <img 
                src="https://i.imgur.com/7ozyayR.png" 
                alt="Partner Logo" 
                className="w-full h-auto object-contain"
              />
              <BorderBeam 
                size={200} 
                duration={15} 
                delay={6}
                colorFrom="#4f46e5"
                colorTo="#8b5cf6" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
