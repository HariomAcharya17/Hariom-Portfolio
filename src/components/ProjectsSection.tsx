import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ParticleCard, GlobalSpotlight } from "@/components/ui/ParticleCard";
import ScrollFloat from "@/components/ui/ScrollFloat";
import ViewProjectButton from "@/components/ui/ViewProjectButton";
import LiveDemoButton from "@/components/ui/LiveDemoButton";

import TechBadge, { getTechCategory } from "@/components/ui/TechBadge";

interface ProjectItem {
  id?: number | string;
  title: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  tech?: string;
  github?: string;
  demo?: string;
  link?: string;
  reveal?: boolean;
  _type?: "project" | "upcoming";
}

interface ProjectsSectionProps {
  lightMode?: boolean;
  isHomePreview?: boolean;
}

export default function ProjectsSection({ lightMode, isHomePreview = false }: ProjectsSectionProps) {
  const ref = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [upcoming, setUpcoming] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      if (data) setProjects(data);
    };

    const fetchUpcoming = async () => {
      const { data, error } = await supabase
        .from("upcoming_projects")
        .select("*");

      if (data) setUpcoming(data);
    };

    fetchProjects();
    fetchUpcoming();
  }, []);

  const allCards = [
    ...projects.map((p) => ({ ...p, _type: "project" })),
    ...upcoming.map((u) => ({ ...u, _type: "upcoming" })),
  ];

  const displayedCards = isHomePreview ? allCards.slice(0, 3) : allCards;

  const getTechList = (card: ProjectItem): string[] => {
    let raw: string[] = [];
    if (Array.isArray(card.technologies) && card.technologies.length > 0) {
      raw = card.technologies.map(t => t.trim()).filter(Boolean);
    } else if (typeof card.tech === "string" && card.tech.trim()) {
      raw = card.tech.split(",").map(t => t.trim()).filter(Boolean);
    }

    const cleaned: string[] = [];
    raw.forEach(item => {
      // Split embedded category headers like "Framer Motion Backend: Python" or "scikit-learn Deployment: Vercel"
      const parts = item
        .replace(/(Frontend|Backend|Database|Deployment|Stack|Tech|Cloud|DevOps|Frameworks):\s*/gi, ", ")
        .split(",");
      parts.forEach(p => {
        const trimmed = p.trim();
        if (trimmed && !cleaned.includes(trimmed)) {
          cleaned.push(trimmed);
        }
      });
    });

    return cleaned;
  };

  const renderCategorizedTech = (card: ProjectItem) => {
    const techList = getTechList(card);
    if (techList.length === 0) return null;

    const categories: Record<string, string[]> = {
      "Frontend": [],
      "Backend": [],
      "Database": [],
      "AI / ML": [],
      "Tools & Cloud": []
    };

    techList.forEach(t => {
      const cat = getTechCategory(t);
      if (!categories[cat]) categories[cat] = [];
      if (!categories[cat].includes(t)) {
        categories[cat].push(t);
      }
    });

    const activeCategories = Object.entries(categories).filter(([_, items]) => items.length > 0);

    return (
      <div className="space-y-3 mb-6 text-left border-t border-border/40 pt-4">
        {activeCategories.map(([category, items]) => (
          <div key={category} className="flex flex-row items-center gap-3 text-xs">
            <span className="font-mono text-[11px] font-bold uppercase text-primary tracking-wider min-w-[115px] w-[115px] shrink-0 text-left select-none">
              {category} :-
            </span>
            <div className="flex flex-wrap gap-1.5 items-center flex-1">
              {items.map((t, idx) => (
                <TechBadge key={`${category}-${t}-${idx}`} name={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        
        <ScrollFloat
          containerClassName="mb-16 text-center"
          textClassName="text-4xl md:text-5xl font-bold text-foreground"
          stagger={0.04}
        >
          Projects
        </ScrollFloat>

        {/* Carbon Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full max-w-none mx-auto carbon-card w-full overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              projects.tsx
            </span>
          </div>

          <div className="p-4 md:p-10">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-none mx-auto relative bento-section">

              {displayedCards.map((card, i) => (
                <motion.div
                  key={`${card._type}-${card.id ?? i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="w-full max-w-full"
                >
                  <div className="relative bg-layer/40 border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-primary/50 hover:bg-layer/60 group shadow-sm hover:shadow-md overflow-hidden min-h-[360px]">
                    {/* Subtle colored accent tag */}
                    <div className="absolute top-0 left-0 h-1 w-12 bg-primary rounded-br-lg opacity-80" />

                    {/* Regular project card */}
                    {card._type === "project" && (
                      <div className="flex flex-col justify-between h-full flex-1">
                        <div>
                          {/* Card header */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40 select-none">
                            <div className="flex items-center gap-2 text-primary">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                              </svg>
                              <span className="text-[9px] font-mono font-bold tracking-wider uppercase opacity-85">
                                Featured Project
                              </span>
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Production
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-foreground font-sans">
                            {card.title}
                          </h3>

                          <p className="leading-relaxed break-words text-sm mb-4 text-secondary_text font-sans">
                            {card.description}
                          </p>

                          {/* Achievements bullets */}
                          {card.achievements && (
                            <ul className="space-y-1.5 mb-5 text-xs text-secondary_text">
                              {card.achievements.map((a: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                  </svg>
                                  <span className="leading-relaxed text-left">{a}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div>
                          {/* Categorized Technology Stack with Universal Brand Icons */}
                          {renderCategorizedTech(card)}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-3 text-sm relative z-10">
                            {card.title?.toLowerCase().includes("vox-hire") && (
                              <Link
                                to="/projects/vox-hire"
                                className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1 transition-colors border border-primary/20"
                              >
                                Read Case Study →
                              </Link>
                            )}

                            {card.title?.toLowerCase().includes("phishguard") && (
                              <Link
                                to="/projects/phish-guard"
                                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1 transition-colors border border-emerald-500/20"
                              >
                                Read Case Study →
                              </Link>
                            )}

                            {card.github && (
                              <ViewProjectButton href={card.github}>
                                Code
                              </ViewProjectButton>
                            )}
                            
                            {(card.demo || card.link) && (
                              <LiveDemoButton href={card.demo || card.link}>
                                Live Demo
                              </LiveDemoButton>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Upcoming project card */}
                    {card._type === "upcoming" && (
                      <div className="flex flex-col justify-between h-full flex-1">
                        <div className="flex flex-col h-full flex-1">
                          {/* Category header */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40 select-none">
                            <div className="flex items-center gap-2 text-amber-500">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                              <span className="text-[9px] font-mono font-bold tracking-wider uppercase opacity-85">
                                Classified System
                              </span>
                            </div>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse">
                              Pipeline
                            </span>
                          </div>

                          {card.reveal ? (
                            <>
                              <h3 className="text-xl font-bold mb-3 text-foreground font-sans">
                                {card.title}
                              </h3>
                              <p className="leading-relaxed break-words text-sm mb-6 text-secondary_text font-sans">
                                {card.description}
                              </p>
                            </>
                          ) : (
                            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center my-auto select-none">
                              <span className="text-3xl mb-3">🔒</span>
                              <h3 className="text-base font-bold mb-1.5 text-foreground font-sans">
                                Engine Locked
                              </h3>
                              <p className="text-[11px] max-w-xs text-secondary_text leading-relaxed">
                                Secure sandbox integration under active development. Core features will be unlocked soon.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects link in home preview mode */}
            {isHomePreview && (
              <div className="mt-12 flex justify-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-md group"
                >
                  View All Projects
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}