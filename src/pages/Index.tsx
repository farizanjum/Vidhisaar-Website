
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { BackgroundBeamsDemo } from "@/components/background-beams-demo";
import { Navigation } from "@/components/navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DemoHeroGeometric />
      <BackgroundBeamsDemo />
    </div>
  );
};

export default Index;
