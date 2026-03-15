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

export default function AboutSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative overflow-hidden">

      {!lightMode && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-500/20 blur-[180px]" />
      )}

      <div className="container mx-auto px-6" ref={ref}>

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            lightMode ? "text-black" : "text-white"
          }`}>
            About <span className="text-purple-400">Me</span>
          </h2>

          <div className={`flex items-center justify-center gap-2 ${
            lightMode ? "text-gray-600" : "text-gray-400"
          }`}>
            <MapPin size={16} className="text-purple-400" />
            <span>Gandhinagar, India</span>
          </div>

        </motion.div>

        {/* MacBook window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`max-w-6xl mx-auto rounded-xl border shadow-2xl overflow-hidden ${
            lightMode
              ? "bg-white border-gray-200"
              : "bg-[#0d1117] border-[#30363d]"
          }`}
        >

          {/* window header */}
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${
            lightMode
              ? "bg-gray-100 border-gray-200"
              : "bg-[#161b22] border-[#30363d]"
          }`}>

            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="ml-4 text-sm text-gray-400 font-mono">
              about.tsx
            </span>

          </div>

          {/* content */}
          <div className="p-10">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`max-w-2xl mx-auto mb-16 leading-relaxed text-lg text-center ${
                lightMode ? "text-gray-600" : "text-gray-300"
              }`}
            >
              I'm a passionate prefinal year student who thrives on building impactful projects.
              My journey spans Artificial Intelligence, Machine Learning, Full Stack Development,
              and Cloud Engineering — always looking to solve real-world problems with elegant
              technical solutions.
            </motion.p>

            {/* cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ y: -6 }}
                  className={`rounded-lg border p-6 ${
                    lightMode
                      ? "bg-gray-50 border-gray-200"
                      : "bg-[#161b22] border-[#30363d]"
                  }`}
                >

                  <div className="w-12 h-12 rounded-md bg-purple-500/20 flex items-center justify-center mb-4">
                    <card.icon className="text-purple-400" size={22} />
                  </div>

                  <h3 className={`font-semibold mb-2 ${
                    lightMode ? "text-black" : "text-white"
                  }`}>
                    {card.title}
                  </h3>

                  <p className={`text-sm ${
                    lightMode ? "text-gray-600" : "text-gray-400"
                  }`}>
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