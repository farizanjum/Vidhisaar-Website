
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { BackgroundBeamsDemo } from "@/components/background-beams-demo";

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
      <BackgroundBeamsDemo />
    </div>
  );
};

export default Index;
