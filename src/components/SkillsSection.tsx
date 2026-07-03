import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";



export default function SkillsSection({ lightMode }: any) {
  const getSkillColor = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes("react") || s.includes("next")) return { bg: "bg-[#61dafb]/20", text: "text-[#007da8] dark:text-[#61dafb]", border: "border-[#61dafb]/50" };
    if (s.includes("node") || s.includes("express")) return { bg: "bg-[#339933]/20", text: "text-[#246e24] dark:text-[#339933]", border: "border-[#339933]/50" };
    if (s.includes("python")) return { bg: "bg-[#3776ab]/20", text: "text-[#255278] dark:text-[#3776ab]", border: "border-[#3776ab]/50" };
    if (s === "c" || s === "c++") return { bg: "bg-[#00599c]/20", text: "text-[#003b66] dark:text-[#52a1ff]", border: "border-[#00599c]/50" };
    if (s.includes("javascript") || s.includes("js")) return { bg: "bg-[#f7df1e]/20", text: "text-[#9c8900] dark:text-[#f7df1e]", border: "border-[#f7df1e]/50" };
    if (s.includes("typescript") || s.includes("ts")) return { bg: "bg-[#3178c6]/20", text: "text-[#1d4c80] dark:text-[#3178c6]", border: "border-[#3178c6]/50" };
    if (s.includes("html")) return { bg: "bg-[#e34f26]/20", text: "text-[#a33516] dark:text-[#e34f26]", border: "border-[#e34f26]/50" };
    if (s.includes("css") || s.includes("tailwind")) return { bg: "bg-[#1572b6]/20", text: "text-[#0d4a78] dark:text-[#1572b6]", border: "border-[#1572b6]/50" };
    if (s.includes("mongo")) return { bg: "bg-[#47a248]/20", text: "text-[#2f6e2f] dark:text-[#47a248]", border: "border-[#47a248]/50" };
    if (s.includes("supabase") || s.includes("sql")) return { bg: "bg-[#3ecf8e]/20", text: "text-[#1a8c58] dark:text-[#3ecf8e]", border: "border-[#3ecf8e]/50" };
    if (s.includes("git") || s.includes("github")) return { bg: "bg-[#f05032]/20", text: "text-[#a8331d] dark:text-[#f05032]", border: "border-[#f05032]/50" };
    if (s.includes("docker")) return { bg: "bg-[#2496ed]/20", text: "text-[#155b94] dark:text-[#2496ed]", border: "border-[#2496ed]/50" };
    if (s.includes("go")) return { bg: "bg-[#00add8]/20", text: "text-[#00708c] dark:text-[#00add8]", border: "border-[#00add8]/50" };
    if (s.includes("machine learning") || s.includes("deep learning") || s.includes("nlp") || s.includes("llm")) return { bg: "bg-[#ff6f00]/20", text: "text-[#b34d00] dark:text-[#ff6f00]", border: "border-[#ff6f00]/50" };
    if (s.includes("data") || s.includes("vector")) return { bg: "bg-[#9c27b0]/20", text: "text-[#651574] dark:text-[#ce55e2]", border: "border-[#9c27b0]/50" };
    if (s.includes("linux") || s.includes("arduino") || s.includes("cisco")) return { bg: "bg-[#00a86b]/20", text: "text-[#006e46] dark:text-[#00a86b]", border: "border-[#00a86b]/50" };
    
    return { bg: "bg-[#e0e0e0] dark:bg-[#393939]", text: "text-black dark:text-white", border: "border-border" };
  };
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

  const activeSkillGroups = skillGroups;

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        
        <ScrollFloat
          containerClassName="mb-16 text-center"
          textClassName="text-4xl md:text-5xl font-bold text-foreground"
          stagger={0.04}
        >
          Skills
        </ScrollFloat>

        {/* Carbon Tile Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto carbon-card overflow-hidden"
        >
          {/* Window Header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              skills.tsx
            </span>
          </div>

          {/* Content */}
          <div className="p-10">
            <div className="grid md:grid-cols-2 gap-10">
              {activeSkillGroups.map((group, i) => {
                const defaultDesc = "Technical tools, languages, and frameworks utilized to design systems and solve problems.";

                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="carbon-card p-6"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {group.title}
                    </h3>

                    <p className="text-xs mb-5 leading-relaxed text-secondary_text">
                      {defaultDesc}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {group.skills.map((skill: string) => {
                        const colors = getSkillColor(skill);
                        return (
                          <span
                            key={skill}
                            className={`text-xs px-3 py-1 font-mono font-medium border ${colors.border} ${colors.bg} ${colors.text} rounded-md`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}