import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cloud, Cpu, Code2, MapPin } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import SplitText from "@/components/ui/SplitText";
import CapabilityCard from "@/components/CapabilityCard";

const cards = [
  {
    icon: Brain,
    title: "AI Development",
    sidebarLabel: "AI DEV",
    desc: "Architecting modular artificial intelligence solutions, agentic workflows, and natural language interfaces utilizing state-of-the-art LLM APIs and vector embeddings.",
    badgeText: "Agentic Systems",
    gradientClass: "from-indigo-100/50 via-purple-100/50 to-blue-50/50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-blue-950/30",
    details: [
      "I construct robust agentic workflows and conversational engines. For example, in <strong>Vox-Hire</strong>, I integrated multiple LLM APIs (OpenAI, Gemini, Hugging Face) to create an adaptive, mock interview system.",
      "I focus on precise model integration, prompt engineering, and utilizing structured outputs to guarantee consistent, type-safe JSON payloads for backend processing.",
      "In <strong>PhishGuard</strong>, I combined threat feeds with custom classifiers to evaluate URL security, showcasing the practical intersection of AI/ML with real-time cybersecurity."
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Systems",
    sidebarLabel: "CLOUD",
    desc: "Designing secure, high-availability cloud-native architectures, containerized Docker microservices, serverless worker nodes, and scalable persistent storage layers.",
    badgeText: "Cloud-Native",
    gradientClass: "from-sky-100/50 via-cyan-100/50 to-teal-50/50 dark:from-sky-950/30 dark:via-cyan-950/30 dark:to-teal-950/30",
    details: [
      "My cloud work concentrates on high-availability configurations and secure data persistence. I leverage <strong>Supabase</strong> and <strong>PostgreSQL</strong> to manage user state, security logs, and expense telemetry.",
      "I containerize service environments using <strong>Docker</strong> to achieve consistency between local development, staging environments, and hosting endpoints.",
      "I am currently preparing for the <strong>AWS Certified Cloud Practitioner</strong> certification to deepen my mastery of secure VPC design, IAM principles, load balancing, and serverless compute."
    ]
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    sidebarLabel: "ML ENG",
    desc: "Training custom statistical models, cleaning and processing complex multi-dimensional datasets, and building low-latency data pipelines for scalable batch calculations.",
    badgeText: "Data Science",
    gradientClass: "from-rose-100/50 via-fuchsia-100/50 to-indigo-50/50 dark:from-rose-950/30 dark:via-fuchsia-950/30 dark:to-indigo-950/30",
    details: [
      "I train and evaluate custom statistical models using libraries like <strong>Scikit-learn</strong>, <strong>NumPy</strong>, and <strong>Pandas</strong> inside Google Colab environments.",
      "In my <strong>IoT Machine Failure Detection System</strong>, I streamed ESP32 microcontroller telemetry into a Flask-based pipeline running classifier models to estimate remaining useful life (RUL).",
      "I emphasize building low-latency inference pipelines, processing incoming multi-dimensional data, and implementing robust anomaly detection routines."
    ]
  },
  {
    icon: Code2,
    title: "Full Stack",
    sidebarLabel: "STACK",
    desc: "Developing fast, responsive React interfaces backed by optimized Node.js servers, Web Audio nodes, secure REST/GraphQL endpoints, and high-performance databases.",
    badgeText: "Full-Stack Dev",
    gradientClass: "from-blue-100/50 via-indigo-100/50 to-emerald-50/50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-emerald-950/30",
    details: [
      "I create clean, responsive interfaces. For <strong>EaseExpense</strong>, built during my NST internship, I structured a React frontend interacting with a Node.js/Express API and Supabase.",
      "I write clean APIs in <strong>FastAPI</strong> (Python) and <strong>Express</strong> (TypeScript) that incorporate role-based auth, secure validation, and rate-limiting schemas.",
      "I prioritize user experience, implementing responsive web structures, state-driven UI animations, custom layout wrappers, and robust sound/visual design."
    ]
  },
];

interface AboutSectionProps {
  lightMode: boolean;
}

export default function AboutSection({ lightMode }: AboutSectionProps) {
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
                text="I am a Final year Computer Science and Engineering student passionate about Full-Stack Development and Cloud Computing. I love building real-world projects that leverage AI applications to solve practical problems, turning ideas into functional, scalable platforms."
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
          className="w-full max-w-none mx-auto carbon-card overflow-hidden"
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
                >
                  <CapabilityCard
                    icon={card.icon}
                    title={card.title}
                    sidebarLabel={card.sidebarLabel}
                    desc={card.desc}
                    details={card.details}
                    gradientClass={card.gradientClass}
                    badgeText={card.badgeText}
                    index={i}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}