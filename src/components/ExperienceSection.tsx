import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
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
            <div className="relative border-l-2 border-border ml-4 md:ml-6 space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id || i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-8 md:pl-10 group"
                >
                  {/* Timeline icon */}
                  <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 border-layer bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-md">
                    <Briefcase size={14} />
                  </div>

                  <div className="p-2 md:p-4 rounded-2xl transition-all duration-300 group-hover:bg-layer/30">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground tracking-tight mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                          {exp.company}
                        </p>
                      </div>
                      
                      {/* Descriptive Date */}
                      <div className="flex items-center text-sm font-medium text-secondary_text self-start md:self-start bg-layer/50 px-3 py-1.5 rounded-full border border-border/50">
                        <Calendar size={14} className="mr-2 opacity-70" />
                        {exp.duration}
                      </div>
                    </div>

                    <p className="text-base mb-5 leading-relaxed text-secondary_text">
                      {exp.description}
                    </p>

                    {exp.highlights && (
                      <ul className="space-y-2">
                        {exp.highlights.map((h: string, idx: number) => (
                          <li key={idx} className="flex items-start text-sm text-secondary_text">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span>{h}</span>
                          </li>
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