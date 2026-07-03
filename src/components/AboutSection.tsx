import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cloud, Cpu, Code2, MapPin } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SplitText from "@/components/ui/SplitText";

const cards = [
  {
    icon: Brain,
    title: "AI Development",
    desc: "Architecting modular artificial intelligence solutions, agentic workflows, and natural language interfaces utilizing state-of-the-art LLM APIs and vector embeddings."
  },
  {
    icon: Cloud,
    title: "Cloud Systems",
    desc: "Designing secure, high-availability cloud-native architectures, containerized Docker microservices, serverless worker nodes, and scalable persistent storage layers."
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    desc: "Training custom statistical models, cleaning and processing complex multi-dimensional datasets, and building low-latency data pipelines for scalable batch calculations."
  },
  {
    icon: Code2,
    title: "Full Stack",
    desc: "Developing fast, responsive React interfaces backed by optimized Node.js servers, Web Audio nodes, secure REST/GraphQL endpoints, and high-performance databases."
  },
];

export default function AboutSection({ lightMode }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>

        {/* CENTERED HEADING & BIO */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <ScrollFloat
              textClassName="text-4xl md:text-5xl font-bold text-foreground"
              stagger={0.04}
            >
              About Me
            </ScrollFloat>

            <div className="flex items-center justify-center gap-2 text-secondary_text">
              <MapPin size={16} className="text-blue-500" />
              <span className="font-medium text-sm">Gandhinagar, India</span>
            </div>

            <div className="space-y-4">
              <SplitText
                tag="p"
                text="I am a prefinal year Computer Science and Engineering student passionate about Full-Stack Development and Cloud Computing. I love building real-world projects that leverage AI applications to solve practical problems, turning ideas into functional, scalable platforms."
                className="leading-relaxed text-base text-secondary_text"
                textAlign="center"
                delay={10}
                duration={0.7}
              />
              <SplitText
                tag="p"
                text="Alongside web and cloud development, I have hands-on experience working on IoT projects, connecting hardware with software to build practical, real-world solutions. I enjoy exploring new technologies and continuously improving how I design and build systems."
                className="leading-relaxed text-base text-secondary_text"
                textAlign="center"
                delay={10}
                duration={0.7}
              />
            </div>
          </motion.div>
        </div>

        {/* CENTERED CARBON TILE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto carbon-card overflow-hidden"
        >
          {/* window header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              capabilities.tsx
            </span>
          </div>

          {/* content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ y: -4 }}
                  className="carbon-card p-6"
                >
                  <div className="w-12 h-12 rounded-md bg-blue-500/15 flex items-center justify-center mb-4">
                    <card.icon className="text-blue-500" size={22} />
                  </div>

                  <h3 className="font-semibold mb-2 text-foreground">
                    {card.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-secondary_text">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}