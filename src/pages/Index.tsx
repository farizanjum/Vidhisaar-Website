
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { BackgroundBeamsDemo } from "@/components/background-beams-demo";
import { TiltedScrollDemo } from "@/components/tilted-scroll-demo";
import { PartnersSection } from "@/components/partners-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { lazy, Suspense } from "react";

// Use lazy loading for non-critical sections to improve initial load performance
const LazyBackgroundBeamsDemo = lazy(() => import("@/components/background-beams-demo").then(mod => ({ default: mod.BackgroundBeamsDemo })));
const LazyPartnersSection = lazy(() => import("@/components/partners-section").then(mod => ({ default: mod.PartnersSection })));
const LazyFAQSection = lazy(() => import("@/components/faq-section").then(mod => ({ default: mod.FAQSection })));

const Index = () => {
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
      
      <Suspense fallback={<div className="h-96 bg-black"></div>}>
        <LazyPartnersSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black"></div>}>
        <LazyFAQSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black"></div>}>
        <LazyBackgroundBeamsDemo />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
