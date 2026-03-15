import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SkillsSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [skillGroups, setSkillGroups] = useState<any[]>([]);

  useEffect(() => {

    const fetchSkills = async () => {

      const { data, error } = await supabase
        .from("skills")
        .select("*");

      if (!error && data) {

        const grouped: any = {};

        data.forEach((item) => {

          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }

          grouped[item.category].push(item.name);

        });

        const formatted = Object.keys(grouped).map((category) => ({
          title: category,
          skills: grouped[category],
        }));

        setSkillGroups(formatted);

      }

    };

    fetchSkills();

  }, []);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">

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
          Skills
        </motion.h2>

        {/* MacBook Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`max-w-6xl mx-auto rounded-xl border shadow-2xl overflow-hidden ${
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
              skills.tsx
            </span>
          </div>

          {/* Content */}
          <div className="p-10">

            <div className="grid md:grid-cols-2 gap-10">

              {skillGroups.map((group, i) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className={`border rounded-lg p-6 ${
                    lightMode
                      ? "bg-gray-50 border-gray-200"
                      : "bg-[#161b22] border-[#30363d]"
                  }`}
                >

                  <h3 className={`text-lg font-semibold mb-4 ${
                    lightMode ? "text-black" : "text-white"
                  }`}>
                    {group.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {group.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="text-sm px-3 py-1 rounded-md bg-purple-500/15 text-purple-500 border border-purple-500/20"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                </motion.div>
              ))}

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}