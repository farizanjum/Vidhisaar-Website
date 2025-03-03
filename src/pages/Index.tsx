
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { BackgroundBeamsDemo } from "@/components/background-beams-demo";
import { TiltedScrollDemo } from "@/components/tilted-scroll-demo";
import { PartnersSection } from "@/components/partners-section";

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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-50"></div>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent relative z-10">Key Features</h2>
        <TiltedScrollDemo />
      </div>
      <PartnersSection />
      <BackgroundBeamsDemo />
    </div>
  );
};

export default Index;
