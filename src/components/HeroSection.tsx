import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import OptionWheel from "@/components/ui/OptionWheel";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import HeroProjectButton from "@/components/ui/HeroProjectButton";

const roles = ["Software Development Intern", "Full-Stack Web Developer", "Aspiring Cloud Engineer"];

const HERO_WHEEL_ITEMS = [
  "Turning Ideas Into Code",
  "Bridging Hardware & Software",
  "Building Scalable Systems",
  "Engineering Intelligent Applications",
  "From Prototype to Production",
  "Cloud-Native Thinker",
  "Systems That Think & Scale"
];

export default function HeroSection({ lightMode }: any) {

const [roleIdx, setRoleIdx] = useState(0);
const [text, setText] = useState("");
const [deleting, setDeleting] = useState(false);

useEffect(() => {

const current = roles[roleIdx];
let timeout: ReturnType<typeof setTimeout>;

if (!deleting) {

if (text.length < current.length) {
timeout = setTimeout(() => {
setText(current.slice(0, text.length + 1));
}, 80);
} else {
timeout = setTimeout(() => setDeleting(true), 2000);
}

} else {

if (text.length > 0) {
timeout = setTimeout(() => {
setText(text.slice(0, -1));
}, 40);
} else {
setDeleting(false);
setRoleIdx((prev) => (prev + 1) % roles.length);
}

}

return () => clearTimeout(timeout);

}, [text, deleting, roleIdx]);

return (

<section
  className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out bg-transparent pt-24 sm:pt-28 lg:pt-16 pb-12 lg:pb-0"
>

  <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">

      {/* LEFT ALIGNED CONTENT */}
      <div className="flex flex-col items-start justify-center text-left max-w-none xl:max-w-3xl w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start justify-center w-full"
        >

          <p className="text-blue-500 font-mono text-xs sm:text-sm mb-3">
            &lt;Hello World /&gt;
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-3 text-foreground tracking-tight">
            I'm <span className="text-blue-500">Hariom</span>
            <br />
            Acharya
          </h1>

          <div className="h-8 mb-4">
            <span className="font-mono text-base sm:text-lg text-blue-500">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="max-w-2xl text-sm sm:text-base mb-8 leading-relaxed text-left text-secondary_text">
            Final-year B.Tech Computer Engineering student at <span className="text-blue-500 font-semibold">LDRP-ITR</span>, building full-stack web applications and AI-integrated systems — with a growing focus on cloud infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4">

            <HeroProjectButton href="/projects">
              View Projects
            </HeroProjectButton>

            <DownloadCVButton href="/resume.pdf">
              Resume
            </DownloadCVButton>

          </div>

        </motion.div>
      </div>

      {/* INTERACTIVE OPTION WHEEL (OFFICIAL TRIGONOMETRIC RADIAL PHYSICS) */}
      <div className="relative w-full max-w-full sm:max-w-[520px] h-[340px] sm:h-[420px] lg:h-[550px] z-20 flex items-center justify-center pointer-events-auto touch-pan-y overflow-hidden bg-transparent">
        <OptionWheel
          items={HERO_WHEEL_ITEMS}
          side="right"
          fontSize={1.8}
          spacing={1.4}
          curve={1.2}
          tilt={6}
          inset={20}
          defaultSelected={0}
          loop={true}
          activeColor={lightMode ? "#0f62fe" : "#ffffff"}
          textColor={lightMode ? "#94a3b8" : "#8d8d8d"}
        />
      </div>

    </div>
  </div>

  {/* Scroll Indicator */}
  <motion.div
    className="absolute left-1/2 -bottom-6 -translate-x-1/2 hidden md:block pointer-events-none"
    animate={{ y: [0, 12, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDown className="text-blue-500 opacity-70" size={28}/>
  </motion.div>

</section>

);

}