
import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <img 
              src="https://i.imgur.com/O1msyDo.png" 
              alt="Vidhisaar Logo" 
              className="w-32 h-auto"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 md:mb-0">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
            <a href="#privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-gray-300 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            © 2025 Vidhisaar<br />
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
