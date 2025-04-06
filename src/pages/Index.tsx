
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { WaitlistSection } from "@/components/waitlist/waitlist-section";
import { TiltedScrollDemo } from "@/components/tilted-scroll-demo";
import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { FeaturesSection } from "@/components/features-section";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative bg-black">
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-50">
        <img 
          src="https://i.imgur.com/O1msyDo.png" 
          alt="Vidhisaar Logo" 
          className="w-20 sm:w-24 md:w-32 h-auto"
          loading="eager"
        />
      </div>
      <DemoHeroGeometric />
      <div className="relative z-10 py-4 sm:py-8 bg-black">
        <div className="absolute inset-0 bg-black opacity-100"></div>
        <h2 className="text-center text-lg sm:text-xl md:text-3xl font-bold mb-2 sm:mb-4 text-white relative z-10 px-2 sm:px-4">Key Features</h2>
        <TiltedScrollDemo />
      </div>
      <FeaturesSection />
      <PartnersSection />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Index;
