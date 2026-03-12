import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Download, FolderOpen } from "lucide-react";
import developerAvatar from "@/assets/developer-avatar.png";

const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Cloud Engineer"];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-purple/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-cyan/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-neon-cyan font-mono text-sm mb-4"
            >
              &lt;Hello World /&gt;
            </motion.p>

            <h1 className="text-5xl md:text-7xl font-bold font-display mb-4">
              <span className="text-foreground">I'm </span>
              <span className="gradient-text">Hariom</span>
              <br />
              <span className="text-foreground">Acharya</span>
            </h1>

            <div className="h-8 mb-6">
              <span className="font-mono text-lg text-neon-purple">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Prefinal year student enthusiastic about building real-world projects focused on AI, Machine Learning, Full Stack and Cloud.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity neon-glow"
              >
                <FolderOpen size={18} /> View Projects
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm glass hover:bg-secondary/50 transition-colors text-foreground"
              >
                <Download size={18} /> Download Resume
              </a>
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-[60px] animate-pulse-glow" />
              <motion.img
                src={developerAvatar}
                alt="Hariom Acharya - Developer Avatar"
                className="relative w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-muted-foreground" size={24} />
        </motion.div>
      </div>
    </section>
  );
}
