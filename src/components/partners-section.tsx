
import React from "react";
import { useTheme } from "next-themes";

export function PartnersSection() {
  const { theme } = useTheme();
  
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
            </div>
            
            <div className="relative w-full max-w-[300px] aspect-auto">
              <img 
                src="https://i.imgur.com/7ozyayR.png" 
                alt="Partner Logo" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative -mt-12 h-64 w-full overflow-hidden">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-black" />
      </div>
    </div>
  );
}
