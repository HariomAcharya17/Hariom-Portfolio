import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Hammer,
  Target,
  ArrowRight
} from "lucide-react";
import developerPhoto from "@/assets/developer-photo.jpg";

export default function AboutSection({ lightMode }: { lightMode?: boolean }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl" ref={containerRef}>

        {/* SINGLE FLOWING CONTAINER */}
        <div className="space-y-12">

          {/* SECTION 1: INTRO HEADLINE & PROFILE PHOTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-border/50 pb-10"
          >
            {/* INTRO TEXT (8 COLS ON DESKTOP) */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles size={14} /> Full-Stack & AI/ML Engineer
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Hi, I'm Hariom Acharya.
              </h1>

              <p className="text-base md:text-lg text-secondary_text leading-relaxed">
                I build full-stack applications and AI-integrated systems. I'm currently a final-year B.Tech Computer Engineering student at <strong className="text-foreground">LDRP Institute of Technology and Research</strong> in Gandhinagar, Gujarat, with a CGPA of 8.64 (SPI 9.29). Alongside my coursework, I completed a software development internship at <strong className="text-foreground">NST Private Limited</strong>, where I built EaseExpense, a full-stack expense-tracking platform using React, Node.js, and Supabase.
              </p>
            </div>

            {/* PROFILE PHOTO (4 COLS ON DESKTOP) */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-48 h-56 md:w-52 md:h-60 rounded-2xl overflow-hidden border border-border bg-layer shadow-md">
                <img
                  src={developerPhoto}
                  alt="Hariom Acharya Profile Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* SECTION 2: QUICK FACTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-secondary_text">
              Quick Facts
            </h2>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs md:text-sm text-secondary_text">
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-blue-500 shrink-0" />
                <span><strong className="text-foreground">Location:</strong> Gandhinagar, India</span>
              </div>

              <div className="flex items-center gap-1.5">
                <GraduationCap size={15} className="text-blue-500 shrink-0" />
                <span><strong className="text-foreground">Education:</strong> B.Tech CSE (LDRP-ITR)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-mono text-blue-500 font-bold">📊</span>
                <span><strong className="text-foreground">Academics:</strong> CGPA 8.64 / SPI 9.29</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Briefcase size={15} className="text-blue-500 shrink-0" />
                <span><strong className="text-foreground">Internship:</strong> NST Private Limited</span>
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                <span><strong className="text-foreground">Status:</strong> Final-Year Student (Open for Engineering Roles)</span>
              </div>
            </div>
          </motion.div>

          {/* SECTION 3: PERSONAL BIO DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-secondary_text leading-relaxed text-sm md:text-base border-t border-border/50 pt-10"
          >
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <UserCheck size={22} className="text-primary" /> Personal Bio & Engineering Focus
            </h2>

            <p>
              My focus sits at the intersection of clean frontend engineering, robust backend systems, and practical machine learning — I'm not interested in AI as a checkbox; I look for places where it genuinely makes a project more capable. That same instinct pulls me toward hardware and IoT, where I've built systems like an ESP32-based Machine Failure Detection pipeline that streams live telemetry into classifier models to estimate remaining useful life.
            </p>

            <p>
              My journey here hasn't been purely academic. I've built <strong className="text-foreground">Vox-Hire</strong>, an AI-powered mock interview platform integrating multiple LLM APIs, and <strong className="text-foreground">PhishGuard</strong>, a real-time phishing detection system combining threat feeds with custom classifiers — the kind of projects that taught me more about shipping software than any single course did. I approach all of this with a structured, SDLC-driven mindset — understanding the problem thoroughly, planning before building, and testing rigorously rather than shipping and hoping.
            </p>
          </motion.div>

          {/* SECTION 4: CURRENTLY BUILDING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 border-t border-border/50 pt-10"
          >
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Hammer size={20} className="text-primary" /> Currently Building
            </h2>

            <p className="text-secondary_text leading-relaxed text-sm md:text-base p-4 rounded-2xl bg-layer/40 border border-border">
              Wrapping up my final year while continuing to sharpen my full-stack and AI/ML skills through hands-on projects — most recently focused on tighter AI integration across my existing work and deepening my grasp of cloud infrastructure.
            </p>
          </motion.div>

          {/* SECTION 5: THE KIND OF WORK I'M AFTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4 border-t border-border/50 pt-10"
          >
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Target size={20} className="text-primary" /> The Kind of Work I'm After
            </h2>

            <ul className="space-y-3 text-secondary_text text-sm md:text-base">
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-layer/40 border border-border">
                <ArrowRight size={18} className="text-primary shrink-0 mt-0.5" />
                <span>A full-time <strong className="text-foreground">Software Engineer / Full-Stack Developer</strong> role as I graduate.</span>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-layer/40 border border-border">
                <ArrowRight size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Teams that care about <strong className="text-foreground">clean, maintainable code</strong> as much as fast delivery.</span>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-layer/40 border border-border">
                <ArrowRight size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Room to keep working across the <strong className="text-foreground">full stack — frontend, backend, and wherever it fits, AI/ML and IoT.</strong></span>
              </li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}