import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, FolderOpen } from "lucide-react";
import Lanyard from "@/components/ui/Lanyard";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import HeroProjectButton from "@/components/ui/HeroProjectButton";

const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Cloud Engineer"];

export default function HeroSection({ lightMode }: any) {

const [roleIdx, setRoleIdx] = useState(0);
const [text, setText] = useState("");
const [deleting, setDeleting] = useState(false);

/* particles */

const [particles] = useState(() =>
Array.from({ length: 170 }).map(() => ({
center: `${10 + Math.random() * 100}%`,
duration: `${20 + Math.random() * 60}s`,
delay: `${Math.random() * 10}s`
}))
);

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
  className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out bg-transparent pt-28 lg:pt-16 pb-12 lg:pb-0"
>

  <div className="container mx-auto px-6 relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">

      {/* LEFT ALIGNED CONTENT */}
      <div className="flex flex-col items-start justify-center text-left max-w-none xl:max-w-4xl w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start justify-center w-full"
        >

          <p className="text-blue-500 font-mono text-sm mb-4">
            &lt;Hello World /&gt;
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-foreground">
            I'm <span className="text-blue-500">Hariom</span>
            <br />
            Acharya
          </h1>

          <div className="h-8 mb-6">
            <span className="font-mono text-lg text-blue-500">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="max-w-3xl xl:max-w-4xl mb-8 leading-relaxed text-left text-secondary_text">

            I'm a <span className="text-blue-500 font-semibold">
              Full Stack & AI/ML Engineer
            </span> passionate about building intelligent, scalable systems that solve real-world problems.

            <br /><br />

            I work with <span className="text-blue-500 font-semibold">
              AI/ML, IoT, and the MERN stack
            </span> focusing on scalable solutions.

            <br /><br />

            My interests include <span className="text-blue-500 font-semibold">
              web development, cloud computing, and intelligent systems
            </span> solving real-world problems.

          </p>

          <div className="flex flex-wrap justify-start gap-4">

            <HeroProjectButton href="#projects">
              View Projects
            </HeroProjectButton>

            <DownloadCVButton href="/resume.pdf">
              Download Resume
            </DownloadCVButton>

          </div>

        </motion.div>
      </div>

      {/* RESPONSIVE LANYARD CARD */}
      <div className="relative w-full max-w-[480px] h-[450px] sm:h-[600px] lg:h-[720px] z-30 pointer-events-auto flex items-center justify-center">
        <Lanyard position={[0, 0, 30]} gravity={[0, -30, 0]} lanyardWidth={10} lightMode={lightMode} />
      </div>

    </div>
  </div>

  {/* Scroll */}
  <motion.div
    className="absolute left-1/2 -bottom-6 -translate-x-1/2"
    animate={{ y: [0, 12, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDown className="text-blue-500 opacity-70" size={28}/>
  </motion.div>

</section>

);

}