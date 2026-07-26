import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { Briefcase, Camera, HeartHandshake, Award, ChevronDown, Code, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  id?: number | string;
  role: string;
  org: string;
  year: number | string;
  description: string;
  achievements?: string[];
  projectDetails?: {
    name: string;
    stack: string;
    highlights: string[];
  };
}

const defaultExperiences: ExperienceItem[] = [
  {
    id: "nst-internship",
    role: "Software Engineering Intern",
    org: "NST Private Limited",
    year: "2024",
    description: "Built EaseExpense, a full-stack financial tracking platform with automated budget calculations, role-based auth, and interactive analytics.",
    achievements: [
      "Engineered <strong>EaseExpense</strong> from architectural design to deployment using <strong>React</strong>, <strong>Node.js/Express</strong>, and <strong>Supabase/PostgreSQL</strong>.",
      "Designed secure REST APIs handling multi-currency calculations, expense category filtering, and monthly budget overage thresholds.",
      "Built interactive data visualization charts with automated email notifications for budget limit alerts.",
      "Gained hands-on experience in networking fundamentals, secure JWT validation, and containerized Docker development."
    ],
    projectDetails: {
      name: "EaseExpense Internship Platform",
      stack: "React, Node.js, Express, Supabase, PostgreSQL, Tailwind CSS",
      highlights: [
        "Architected relational database tables for expense logs, category limits, and user sessions.",
        "Implemented client-side caching and optimistic UI updates for instantaneous financial calculations.",
        "Delivered full technical documentation and pull request walk-throughs for internal engineering reviews."
      ]
    }
  },
  {
    id: "vox-hire-dev",
    role: "Lead Full-Stack & AI Developer",
    org: "Vox-Hire (AI Recruitment Platform)",
    year: "2024",
    description: "Architected Vox-Hire, an intelligent AI mock interview engine providing adaptive technical questions and real-time candidate evaluation.",
    achievements: [
      "Integrated multiple LLM API providers (<strong>OpenAI GPT-4</strong>, <strong>Google Gemini</strong>) with structured output schemas for consistent JSON payloads.",
      "Built Web Audio recording nodes and real-time speech-to-text processing pipelines.",
      "Structured FastAPI microservices for latency-optimized prompt evaluation and scoring rubrics."
    ]
  },
  {
    id: "phishguard-dev",
    role: "Cybersecurity & ML Developer",
    org: "PhishGuard (Threat Scanner)",
    year: "2024",
    description: "Engineered a real-time phishing URL threat scanner leveraging Random Forest machine learning models and threat intelligence feeds.",
    achievements: [
      "Trained custom statistical classifiers on multi-dimensional lexical and host-based URL feature vectors.",
      "Connected <strong>FastAPI</strong> endpoints with VirusTotal APIs for instant multi-engine threat scores.",
      "Achieved high precision in detecting malicious domain patterns and credential harvesting redirects."
    ]
  },
  {
    id: "sttp-photo",
    role: "Photography Committee Lead",
    org: "STTP Workshop Committee",
    year: "2023",
    description: "Managed photography committee logistics, visual media coverage, and post-event highlight compilations.",
    achievements: [
      "Captured and edited high-resolution event photographs and video highlight reels.",
      "Coordinated with session speakers and organizers to ensure full visual curriculum coverage."
    ]
  }
];

export default function ExperienceSection({ lightMode }: { lightMode?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
  const [expandedIds, setExpandedIds] = useState<Record<string | number, boolean>>({
    "nst-internship": true,
    "vox-hire-dev": true
  });

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const { data } = await supabase
          .from("experience")
          .select("*")
          .order("year", { ascending: false });

        if (data && data.length > 0) {
          setExperiences(data);
        }
      } catch (e) {
        // Fall back to defaultExperiences
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
    if (o.includes("vox") || o.includes("phish")) return Code;
    if (o.includes("sttp")) return Camera;
    return Award;
  };

  const getExperienceDetails = (exp: ExperienceItem): string[] => {
    if (exp.achievements && exp.achievements.length > 0) return exp.achievements;
    return [
      "Contributed actively as a technical lead and core developer.",
      "Designed scalable software architectures and user interfaces.",
      "Learned and applied industry practices to deliver high-quality outcomes."
    ];
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl" ref={ref}>

        <ScrollFloat
          containerClassName="mb-12 text-center"
          textClassName="text-4xl md:text-5xl font-bold text-foreground"
          stagger={0.04}
        >
          Experience & Projects Breakdown
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
                const bullets = getExperienceDetails(exp);

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
                          <span className="text-[10px] font-mono font-bold text-secondary_text bg-background border border-border/80 px-2 py-0.5 rounded">
                            {exp.year}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-secondary_text transition-transform duration-300 shrink-0 ${
                              isExpanded ? "transform rotate-180 text-primary" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-secondary_text max-w-[95%] mb-2">
                        {exp.description}
                      </p>

                      {/* Expandable Detailed Accomplishments & Project Info */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border/40 space-y-4">
                              <div>
                                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-2">
                                  Key Contributions & Technical Accomplishments:
                                </h5>
                                <ul className="space-y-2">
                                  {bullets.map((bullet, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs leading-relaxed text-secondary_text font-normal flex items-start gap-2"
                                    >
                                      <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                                      <span dangerouslySetInnerHTML={{ __html: bullet }} className="text-left" />
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {exp.projectDetails && (
                                <div className="p-4 rounded-xl bg-background/80 border border-border/60 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-foreground">
                                      Project: {exp.projectDetails.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                                      {exp.projectDetails.stack}
                                    </span>
                                  </div>
                                  <ul className="space-y-1 text-xs text-secondary_text list-disc list-inside pl-1">
                                    {exp.projectDetails.highlights.map((h, hIdx) => (
                                      <li key={hIdx}>{h}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
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