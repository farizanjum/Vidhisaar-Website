
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { BackgroundBeamsDemo } from "@/components/background-beams-demo";
import { TiltedScrollDemo } from "@/components/tilted-scroll-demo";
import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-black">
      <div className="absolute top-4 left-4 z-50">
        <img 
          src="https://i.imgur.com/O1msyDo.png" 
          alt="Vidhisaar Logo" 
          className="w-32 h-auto"
        />
      </div>
      <DemoHeroGeometric />
      <div className="relative z-10 py-8 bg-black">
        <div className="absolute inset-0 bg-black opacity-100"></div>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 text-white relative z-10">Key Features</h2>
        <TiltedScrollDemo />
      </div>
      <PartnersSection />
      <FAQSection />
      <BackgroundBeamsDemo />
    </div>
  );
};

export default Index;
