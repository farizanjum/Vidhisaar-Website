
import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 md:py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-6 md:mb-8">
            <img 
              src="https://i.imgur.com/O1msyDo.png" 
              alt="Vidhisaar Logo" 
              className="w-24 sm:w-32 h-auto"
            />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mt-3 mb-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[pulse_2s_ease-in-out_infinite] w-1/2 left-0"></div>
            </div>
            
            <div className="flex justify-center space-x-6 mt-5">
              <a 
                href="https://www.linkedin.com/company/vidhisaarai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img 
                  src="https://i.imgur.com/zZAZvrK.png" 
                  alt="LinkedIn" 
                  className="w-5 h-5 filter brightness-75 hover:brightness-100 transition-all"
                />
                <span className="sr-only">Linkedin</span>
              </a>
              <a 
                href="https://www.instagram.com/vidhisaar.ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img 
                  src="https://i.imgur.com/FYQVrKR.png" 
                  alt="Instagram" 
                  className="w-5 h-5 filter brightness-75 hover:brightness-100 transition-all"
                />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://x.com/vidhisaarAI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img 
                  src="https://i.imgur.com/vL8NQOG.png" 
                  alt="X" 
                  className="w-5 h-5 filter brightness-75 hover:brightness-100 transition-all"
                />
                <span className="sr-only">X</span>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2025 Vidhisaar<br />
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
