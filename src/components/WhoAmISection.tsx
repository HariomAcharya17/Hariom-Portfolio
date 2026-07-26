import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PortfolioAI from "@/components/PortfolioAI";
import Orb from "@/components/ui/Orb";
import GradientText from "@/components/ui/GradientText";

export default function WhoAmISection({ lightMode }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="hari-ai" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full max-w-none mx-auto flex flex-col lg:flex-row gap-12 items-center"
        >
          {/* Left: Orb */}
          <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[500px]">
            {/* The Orb Background */}
            <div className="absolute inset-0 z-0 scale-125">
              <Orb
                hue={lightMode ? 210 : 210}
                hoverIntensity={0.5}
                rotateOnHover={false}
                forceHoverState={false}
              />
            </div>
            {/* The Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none p-6 text-center">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight drop-shadow-md"
              >
                Know More About Hariom...
              </GradientText>
            </div>
          </div>

          {/* Right Chat Widget */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <p className="sr-only">
              Hariom Acharya is a final-year Computer Science and Engineering student
              at LDRP-ITR, specializing in Full-Stack Development, Cloud Computing,
              and AI/ML. His projects include Vox-Hire, PhishGuard, EaseExpense,
              and an IoT Machine Failure Detection System. Ask the AI assistant
              below any question about his projects, skills, or experience.
            </p>
            <PortfolioAI lightMode={lightMode} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
