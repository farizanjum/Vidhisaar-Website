
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { BackgroundBeamsDemo } from "@/components/background-beams-demo";
import { TiltedScrollDemo } from "@/components/tilted-scroll-demo";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <img 
          src="https://i.imgur.com/O1msyDo.png" 
          alt="Vidhisaar Logo" 
          className="w-32 h-auto"
        />
      </div>
      <DemoHeroGeometric />
      <div className="relative z-10 py-8 bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-50"></div>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 text-white relative z-10">Key Features</h2>
        <TiltedScrollDemo />
      </div>
      <BackgroundBeamsDemo />
    </div>
  );
};

export default Index;
