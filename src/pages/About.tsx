
import React from "react";
import { Footer } from "@/components/ui/footer-section";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Vidhisaar AI</h1>
          <div className="prose prose-invert prose-lg">
            <h3 className="mb-4">Vidhisaar AI — <em>AI Legal Assistant You Can Trust.</em></h3>
            <p>
              Vidhisaar leverages multi-agent intelligence, blockchain, and explainable AI to provide transparent, unbiased, and verifiable legal insights—helping you make informed legal decisions with confidence.
            </p>
            
            <p className="my-6">🚀 <strong>Solo-built. Mission-driven. Tech-first.</strong></p>
            
            <p>
              Born out of curiosity, tech obsession, and a real need to simplify India's complex legal system, Vidhisaar blends:
            </p>
            
            <ul className="my-6 space-y-3">
              <li>
                <span className="mr-2">🧠</span>
                <strong>Multi-Agent Intelligence</strong>
                <p>No single opinion — you get diverse, debate-style AI perspectives.</p>
              </li>
              <li>
                <span className="mr-2">🔐</span>
                <strong>Blockchain Verification</strong>
                <p>Every insight is tamper-proof and traceable. No bias. No manipulation.</p>
              </li>
              <li>
                <span className="mr-2">💬</span>
                <strong>Voice + OCR AI for Bharat</strong>
                <p>Built for <em>Indic languages</em> with voice understanding and legal document reading powers.</p>
              </li>
              <li>
                <span className="mr-2">📚</span>
                <strong>Case Matching & Precedent Finder</strong>
                <p>Get legally relevant cases <em>without sifting through 1000s of judgments</em>.</p>
              </li>
            </ul>
            
            <hr className="my-8 border-gray-800" />
            
            <h3 className="mb-4">Why Vidhisaar?</h3>
            <p>Because Googling laws ≠ legal clarity.</p>
            <p>Because access to justice shouldn't depend on who you know.</p>
            <p>Because AI can explain the law <em>better, faster, and fairer</em>.</p>
            
            <hr className="my-8 border-gray-800" />
            
            <p>
              💡 Built by <strong>one tech enthusiast</strong>, not a team of lawyers. No suits. No jargon. Just pure AI innovation aimed at making law understandable for everyone — from students and startups to citizens and social workers.
            </p>
            
            <hr className="my-8 border-gray-800" />
            
            <p><strong>Vidhisaar AI</strong> – <em>Legal clarity, minus the chaos.</em></p>
            <p>🌐 <a href="https://www.vidhisaarai.in" className="text-blue-400 hover:text-blue-300">www.vidhisaarai.in</a></p>
            <p>📧 <a href="mailto:support@vidhisaarai.in" className="text-blue-400 hover:text-blue-300">support@vidhisaarai.in</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
