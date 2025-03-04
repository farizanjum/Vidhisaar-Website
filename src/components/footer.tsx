
import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <img 
              src="https://i.imgur.com/O1msyDo.png" 
              alt="Vidhisaar Logo" 
              className="w-32 h-auto"
            />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mt-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[pulse_2s_ease-in-out_infinite] w-1/2 left-0"></div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Vidhisaar<br />
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
