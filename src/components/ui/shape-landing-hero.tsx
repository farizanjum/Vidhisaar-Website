
"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "@/hooks/use-mobile";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]"
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  const isMobile = useIsMobile();
  const scaleWidth = isMobile ? 0.6 : 1;
  const scaleHeight = isMobile ? 0.6 : 1;
  
  return <motion.div 
    initial={{
      opacity: 0,
      y: -150,
      rotate: rotate - 15
    }} 
    animate={{
      opacity: 1,
      y: 0,
      rotate: rotate
    }} 
    transition={{
      duration: 2.4,
      delay,
      ease: [0.23, 0.86, 0.39, 0.96],
      opacity: {
        duration: 1.2
      }
    }} 
    className={cn("absolute", className)}
  >
    <motion.div 
      animate={{
        y: [0, 15, 0]
      }} 
      transition={{
        duration: 12,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        repeatType: "mirror"
      }} 
      style={{
        width: width * scaleWidth,
        height: height * scaleHeight
      }} 
      className="relative will-change-transform"
    >
      <div className={cn(
        "absolute inset-0 rounded-full", 
        "bg-gradient-to-r to-transparent", 
        gradient, 
        "backdrop-blur-[2px] border-2 border-white/[0.15]", 
        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]", 
        "after:absolute after:inset-0 after:rounded-full", 
        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
      )} />
    </motion.div>
  </motion.div>;
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites"
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const isMobile = useIsMobile();
  
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };
  
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  
  return <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] px-4">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

    <div className="absolute inset-0 overflow-hidden">
      {/* Adjusted positions for mobile */}
      <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[-30%] sm:left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />

      <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-[-25%] sm:right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />

      <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[-15%] sm:left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />

      <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-amber-500/[0.15]" className="right-[2%] sm:right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />

      <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[5%] sm:left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
    </div>

    <div className="relative z-10 container mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 md:mb-8 lg:mb-12">
          <Circle className="h-2 w-2 fill-rose-500/80" />
          <span className="text-xs sm:text-sm text-white/60 tracking-wide">
            {badge}
          </span>
        </motion.div>

        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 text-4xl sm:text-5xl md:text-7xl">
              {title1}
            </span>
            <br />
            <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 text-4xl sm:text-5xl md:text-7xl")}>
              You can <span className="inline">
                <Typewriter 
                  text={["Trust", "Govern", "Advocate", "Control", "Own"]} 
                  speed={70}
                  waitTime={1500}
                  deleteSpeed={40}
                  loop={true}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 inline"
                  cursorChar="|"
                  cursorClassName="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ml-1"
                />
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
          <p className="text-sm md:text-base mb-6 md:mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 text-zinc-200">
            Vidhisaar leverages multi-agent intelligence, blockchain, and explainable AI to provide transparent, unbiased, and verifiable legal insights—helping you make informed legal decisions with confidence.
          </p>
        </motion.div>

        <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-col items-center gap-4">
          <ShinyButton onClick={scrollToWaitlist} className="px-6 sm:px-8 py-2.5 sm:py-3 text-white bg-indigo-500/20 hover:bg-indigo-500/30">
            Join the Waitlist
          </ShinyButton>
          
          <div className="text-white/40 text-xs sm:text-sm">
            <Typewriter 
              text="1,000+ legal experts/ Enthusiast waiting for launch" 
              speed={50} 
              className="text-white/60 inline-block" 
              loop={true}
            />
          </div>
        </motion.div>
      </div>
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
  </div>;
}

export { HeroGeometric };
