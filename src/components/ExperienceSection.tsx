import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Volunteer — Organizer",
    org: "Chiropractic Event",
    year: "2024",
    description: "Documentation management and ensuring everything worked properly along with photography.",
  },
  {
    role: "Volunteer — Organizer",
    org: "STTP (Short Term Training Program)",
    year: "2024",
    description: "Coordinated logistics, managed documentation, and supported smooth execution of the training program.",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-display text-center mb-16"
        >
          My <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className={`relative pl-12 md:pl-0 mb-12 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute top-2 w-3 h-3 rounded-full bg-primary neon-glow left-3 md:left-auto ${
                  i % 2 === 0 ? "md:right-[-6px]" : "md:left-[-6px]"
                }`}
              />

              <div className="glass rounded-xl p-5">
                <span className="text-xs font-mono text-neon-cyan">{exp.year}</span>
                <h3 className="font-display font-semibold text-foreground mt-1">{exp.role}</h3>
                <p className="text-sm text-primary mb-2">{exp.org}</p>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
