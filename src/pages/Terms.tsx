
import React from "react";
import { Footer } from "@/components/ui/footer-section";

const Terms = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          <div className="prose prose-invert prose-lg">
            <p className="text-gray-400 mb-8">Effective Date: May 14, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>
              These Terms and Conditions ("Terms") govern your access to and use of the Vidhisaar AI platform, including our website (www.vidhisaarai.in) and all related services, features, content, and applications (collectively, the "Services"). Vidhisaar AI ("we", "our", "us") provides an AI-powered legal assistant platform designed to make legal knowledge accessible, understandable, and actionable.
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">1.1 Binding Agreement</h3>
            <p>
              By creating an account, accessing our website, or using any part of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.
            </p>
            
            {/* Additional sections would continue - showing abbreviated version for length */}
            <p className="mt-8">
              For the complete terms and conditions, please visit our website or contact us at support@vidhisaarai.in.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
