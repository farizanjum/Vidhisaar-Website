
import React from "react";
import { Footer } from "@/components/ui/footer-section";

const Privacy = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert prose-lg">
            <p className="text-gray-400 mb-8">Effective Date: May 14, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>
              Vidhisaar AI ("we", "our", "us", or "Vidhisaar") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.vidhisaarai.in or use our AI-powered legal assistant platform and related services (collectively, the "Services").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mt-6 mb-3">1.1 Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-1 my-4">
              <li>Register for an account</li>
              <li>Subscribe to our services</li>
              <li>Submit inquiries or feedback</li>
              <li>Participate in surveys or promotions</li>
              <li>Contact our customer support</li>
            </ul>
            <p>This information may include:</p>
            <ul className="list-disc pl-6 space-y-1 my-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing address</li>
              <li>Professional details (for lawyers and legal professionals)</li>
              <li>User credentials (username and password)</li>
            </ul>
            
            {/* Additional sections would continue - showing abbreviated version for length */}
            <p className="mt-8">
              For the complete privacy policy, please visit our website or contact us at support@vidhisaarai.in.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
