
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { WaitlistSection } from "@/components/waitlist/waitlist-section";
import { TiltedScrollDemo } from "@/components/tilted-scroll-demo";
import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative bg-black">
      <div className="absolute top-4 left-4 z-50">
        <img 
          src="https://i.imgur.com/O1msyDo.png" 
          alt="Vidhisaar Logo" 
          className="w-24 sm:w-32 h-auto"
          loading="eager"
        />
      </div>
      <DemoHeroGeometric />
      <div className="relative z-10 py-8 bg-black">
        <div className="absolute inset-0 bg-black opacity-100"></div>
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white relative z-10 px-4">Key Features</h2>
        <TiltedScrollDemo />
      </div>
      <PartnersSection />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Index;
