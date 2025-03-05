
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { useIsMobile } from "@/hooks/use-mobile";

function DemoHeroGeometric() {
    const isMobile = useIsMobile();
    
    return (
        <HeroGeometric
            badge="Vidhisaar"
            title1="AI Legal Assistant,"
            title2="You can"
        />
    );
}

export { DemoHeroGeometric };
