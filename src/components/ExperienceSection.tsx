import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { Briefcase, Camera, HeartHandshake, Award, ChevronDown } from "lucide-react";

interface ExperienceItem {
  id?: number | string;
  role: string;
  org: string;
  year: number | string;
  description: string;
  achievements?: string[];
}

interface ExperienceSectionProps {
  lightMode: boolean;
}

export default function ExperienceSection({ lightMode }: ExperienceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    const fetchExp = async () => {
      const { data } = await supabase
        .from("experience")
        .select("*")
        .order("year", { ascending: false });

      if (data && data.length > 0) {
        setExperiences(data);
        // Expand the first item (e.g. Software Intern) by default for better visual onboarding
        if (data[0]) {
          const firstId = data[0].id || 0;
          setExpandedIds({ [firstId]: true });
        }
      }
    };

    fetchExp();
  }, []);

  const toggleExpand = (id: string | number) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getExperienceIcon = (org: string) => {
    const o = org.toLowerCase().trim();
    if (o.includes("nst")) return Briefcase;
    if (o.includes("sttp")) return Camera; // Photography Committee
    if (o.includes("chiropractic")) return HeartHandshake; // Seminar Volunteer
    return Award;
  };

  const getExperienceDetails = (exp: ExperienceItem): string[] => {
    if (exp.achievements && exp.achievements.length > 0) return exp.achievements;
    
    const o = exp.org.toLowerCase().trim();
    if (o.includes("nst")) {
      return [
        "Developed and shipped <strong>EaseExpense</strong>, a full-stack monthly budgeting and tracking dashboard.",
        "Integrated <strong>React</strong> with a <strong>Node.js/Express</strong> REST API and a <strong>PostgreSQL/Supabase</strong> database layer.",
        "Implemented automated budget overage <strong>email alerts</strong> and graphical summary reports.",
        "Gained hands-on experience in networking fundamentals, secure data flow, and modern backend architectures."
      ];
    }
    if (o.includes("sttp")) {
      return [
        "Served in the <strong>Photography Committee</strong>, managing visual media coverage and recording of sessions.",
        "Captured and edited high-resolution event photographs and video highlights for social media promotions.",
        "Coordinated with organizers to ensure visual content aligns with the official workshop curriculum.",
        "Designed highlight compilation material and post-event flyers."
      ];
    }
    if (o.includes("chiropractic")) {
      return [
        "Volunteered as a lead organizer assisting guest chiropractors and speakers during session schedules.",
        "Managed registration desk databases, attendee inquiries, resource kit distribution, and seminar logistics.",
        "Maintained coordination of post-event feedback collections and certificate distributions.",
        "Ensured overall session transitions and event venue readiness remained precisely on track."
      ];
    }
    return [
      "Contributed actively as a team member, helping coordinate logistics and daily operations.",
      "Worked on collaborative projects, aligning technical tasks with overall operational goals.",
      "Learned and applied industry practices to resolve challenges and deliver high-quality outcomes."
    ];
  };

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
          className="w-full max-w-none mx-auto carbon-card overflow-hidden"
        >
          {/* window header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer select-none">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              experience_timeline.sh
            </span>
          </div>

          {/* content */}
          <div className="p-4 md:p-10 relative">
            {/* Main vertical line connector */}
            <div className="absolute left-[24px] md:left-[40px] top-10 bottom-10 w-0.5 bg-border/60" />

            <div className="space-y-8 relative">
              {experiences.map((exp, i) => {
                const expId = exp.id || i;
                const isExpanded = !!expandedIds[expId];
                const Icon = getExperienceIcon(exp.org);

                return (
                  <motion.div
                    key={expId}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-12 md:pl-16 group"
                  >
                    {/* Timeline Dot Badge */}
                    <div
                      className={`absolute left-[8px] md:left-[24px] top-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                        isExpanded
                          ? "bg-primary text-white border-primary scale-110 shadow-md"
                          : "bg-layer text-secondary_text border-border group-hover:border-primary/45"
                      }`}
                    >
                      <Icon size={14} />
                    </div>

                    {/* Accordion Card */}
                    <div
                      onClick={() => toggleExpand(expId)}
                      className={`border rounded-2xl p-5 md:p-6 transition-all duration-350 cursor-pointer text-left select-none relative ${
                        isExpanded
                          ? "bg-layer/60 border-primary/50 shadow-md"
                          : "bg-layer/20 border-border hover:border-primary/30 hover:bg-layer/40 shadow-sm"
                      }`}
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <div>
                          <h4 className="text-xs text-primary font-mono font-semibold uppercase tracking-wider mb-0.5">
                            {exp.org}
                          </h4>
                          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight tracking-tight">
                            {exp.role}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 self-start sm:self-center">
                          {/* Year Pill */}
                          <span className="text-[10px] font-mono font-bold text-secondary_text bg-background border border-border/80 px-2 py-0.5 rounded">
                            {exp.year}
                          </span>
                          {/* Expand/Collapse Chevron Indicator */}
                          <ChevronDown
                            size={16}
                            className={`text-secondary_text transition-transform duration-300 shrink-0 ${
                              isExpanded ? "transform rotate-180 text-primary" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-secondary_text max-w-[95%]">
                        {exp.description}
                      </p>

                      {/* Expandable detailed accomplishments list */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border/40">
                              <ul className="space-y-2.5">
                                {getExperienceDetails(exp).map((bullet, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs leading-relaxed text-secondary_text font-normal flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-0.5 shrink-0 select-none">•</span>
                                    <span dangerouslySetInnerHTML={{ __html: bullet }} className="text-left" />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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