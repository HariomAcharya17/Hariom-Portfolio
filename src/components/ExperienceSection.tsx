import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExperienceSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {

    const fetchExperience = async () => {

      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("year", { ascending: false });

      if (!error && data) {
        setExperiences(data);
      }

    };

    fetchExperience();

  }, []);

  return (
    <section id="experience" className="py-28 relative overflow-hidden">

      {/* purple glow only in dark mode */}
      {!lightMode && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-500/20 blur-[180px]" />
      )}

      <div className="container mx-auto px-6" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Experience
        </motion.h2>

        {/* MacBook Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`max-w-5xl mx-auto rounded-xl border shadow-2xl overflow-hidden ${
            lightMode
              ? "bg-white border-gray-200"
              : "bg-[#0d1117] border-[#30363d]"
          }`}
        >

          {/* Window Header */}
          <div
            className={`flex items-center gap-2 px-4 py-3 border-b ${
              lightMode
                ? "bg-gray-100 border-gray-200"
                : "bg-[#161b22] border-[#30363d]"
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="ml-4 text-sm text-gray-400 font-mono">
              experience.tsx
            </span>
          </div>

          {/* Content */}
          <div className="p-10">

            <div
              className={`max-w-3xl mx-auto border-l pl-10 space-y-12 ${
                lightMode ? "border-gray-300" : "border-[#30363d]"
              }`}
            >

              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id || i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >

                  {/* Timeline Dot */}
                  <div className="absolute -left-[26px] top-2 w-3 h-3 bg-purple-400 rounded-full" />

                  <p className="text-sm text-purple-400 mb-1 font-mono">
                    {exp.year}
                  </p>

                  <h3
                    className={`text-lg font-semibold ${
                      lightMode ? "text-black" : "text-white"
                    }`}
                  >
                    {exp.role}
                  </h3>

                  <p
                    className={`text-sm mb-2 ${
                      lightMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {exp.org}
                  </p>

                  <p
                    className={`text-sm leading-relaxed ${
                      lightMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {exp.description}
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