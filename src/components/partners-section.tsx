import React from "react";
import { useTheme } from "next-themes";
import { Sparkles } from "@/components/ui/sparkles";

export function PartnersSection() {
  const { theme } = useTheme();
  
  return (
    <div className="relative flex flex-col items-center justify-center py-12 md:py-16 overflow-hidden bg-black text-white px-4">
      <h2 className="text-center text-xl sm:text-2xl font-bold mb-2 text-white relative z-10">Trusted by Experts</h2>
      <p className="text-center text-base mb-6 md:mb-8 text-white/80 relative z-10">Used by the leaders</p>
      
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="flex flex-row items-center justify-center gap-6 md:gap-12 w-full">
          {/* AWS Logo first */}
          <div className="w-24 sm:w-28 md:w-48 flex items-center justify-center">
            <img 
              src="https://i.imgur.com/YhWqNFt.png" 
              alt="Amazon AWS Logo" 
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          
          {/* Dyne Research Logo second */}
          <div className="w-24 sm:w-28 md:w-48 flex items-center justify-center">
            <img 
              src="https://i.imgur.com/7ozyayR.png" 
              alt="Dyne Research Logo" 
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          
          {/* Kanoon Logo third */}
          <div className="w-24 sm:w-28 md:w-48 flex items-center justify-center">
            <img 
              src="https://i.imgur.com/KLG1rBA.png" 
              alt="Kanoon Logo" 
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <div className="relative -mt-12 h-48 sm:h-64 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent_70%)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-black" />
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color={theme === "dark" ? "#ffffff" : "#ffffff"}
          background="transparent"
        />
      </div>
    </div>
  );
}
