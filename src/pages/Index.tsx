
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { WaitlistSection } from "@/components/waitlist/waitlist-section";
import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/ui/footer-section";
import { useIsMobile } from "@/hooks/use-mobile";
import { FeaturesSection } from "@/components/features-section";

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
      <FeaturesSection className="py-12 sm:py-16 md:py-20" />
      <PartnersSection />
      <FAQSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Index;
