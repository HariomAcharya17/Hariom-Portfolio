import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "IoT Based Machine Failure Prediction",
    description: "An IoT system that collects vibration sensor data from machines using ESP32 and predicts machine failure using machine learning to prevent industrial breakdowns.",
    tech: ["ESP32", "Arduino IDE", "Google Sheets", "Apps Script", "Machine Learning"],
    github: "#",
    demo: "#",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-cyan/5 blur-[120px]" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-display text-center mb-16"
        >
          My <span className="gradient-text">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass rounded-xl overflow-hidden group gradient-border"
            >
              <div className="p-6">
                <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={16} /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
