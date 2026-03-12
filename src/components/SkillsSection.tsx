import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Python", color: "var(--neon-cyan)" },
  { name: "Machine Learning", color: "var(--neon-purple)" },
  { name: "C/C++", color: "var(--neon-pink)" },
  { name: "AI", color: "var(--neon-cyan)" },
  { name: "GitHub", color: "var(--neon-purple)" },
  { name: "VS Code", color: "var(--neon-pink)" },
  { name: "Node.js", color: "var(--neon-cyan)" },
  { name: "React", color: "var(--neon-purple)" },
  { name: "MongoDB", color: "var(--neon-pink)" },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-neon-purple/5 blur-[100px]" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-display text-center mb-16"
        >
          My <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{
                rotateY: 15,
                rotateX: -5,
                scale: 1.05,
                boxShadow: `0 0 25px hsl(${skill.color} / 0.4)`,
              }}
              className="glass rounded-xl p-6 text-center cursor-default gradient-border"
              style={{ perspective: 800 }}
            >
              <span className="font-display font-semibold text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
