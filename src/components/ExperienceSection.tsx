import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";

export default function ExperienceSection({ lightMode }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchExp = async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*");

      if (data && data.length > 0) {
        setExperiences(data);
      }
    };

    fetchExp();
  }, []);

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>

        <ScrollFloat
          containerClassName="mb-16 text-center"
          textClassName="text-4xl md:text-5xl font-bold text-foreground"
          stagger={0.04}
        >
          Experience
        </ScrollFloat>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto carbon-card overflow-hidden"
        >
          {/* window header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              experience.tsx
            </span>
          </div>

          {/* content */}
          <div className="p-10">
            <div className="relative border-l border-neutral-800/80 ml-4 md:ml-6 space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id || i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-8 md:pl-10 group"
                >
                  {/* Timeline icon */}
                  <div className="absolute -left-[18px] top-0 w-8 h-8 rounded-full border border-border flex items-center justify-center bg-layer text-primary">
                    <Briefcase size={14} />
                  </div>

                  <div className="carbon-card p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 font-mono font-medium border border-border bg-[#e0e0e0] text-black dark:bg-[#393939] dark:text-white self-start md:self-center">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-sm mb-4 leading-relaxed text-secondary_text">
                      {exp.description}
                    </p>

                    {exp.highlights && (
                      <ul className="list-disc pl-5 space-y-1 text-xs leading-relaxed text-secondary_text">
                        {exp.highlights.map((h: string, idx: number) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    )}
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