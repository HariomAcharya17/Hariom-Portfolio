import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cloud, Cpu, Code2, MapPin } from "lucide-react";

const cards = [
  { icon: Brain, title: "AI Development", desc: "Building intelligent systems using modern AI frameworks" },
  { icon: Cloud, title: "Cloud Systems", desc: "Designing scalable cloud-native architectures" },
  { icon: Cpu, title: "Machine Learning", desc: "Creating predictive models and data pipelines" },
  { icon: Code2, title: "Full Stack", desc: "End-to-end web development with modern tools" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin size={16} className="text-neon-cyan" />
            <span>Gandhinagar, India</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed text-lg"
        >
          I'm a passionate prefinal year student who thrives on building impactful projects. 
          My journey spans AI, Machine Learning, Full Stack development, and Cloud computing — 
          always looking to solve real-world challenges with elegant technical solutions.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-xl p-6 group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:neon-glow transition-shadow duration-300">
                <card.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
