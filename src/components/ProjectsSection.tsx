import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ParticleCard, GlobalSpotlight } from "@/components/ui/ParticleCard";
import ScrollFloat from "@/components/ui/ScrollFloat";
import ViewProjectButton from "@/components/ui/ViewProjectButton";
import LiveDemoButton from "@/components/ui/LiveDemoButton";

export default function ProjectsSection({ lightMode }: any) {
  const ref = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const [projects, setProjects] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);

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
          className="max-w-6xl mx-auto carbon-card w-full overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              projects.tsx
            </span>
          </div>

          <div className="p-5 md:p-10">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto relative bento-section">
              <GlobalSpotlight gridRef={gridRef} glowColor="37, 99, 235" />

              {allCards.map((card, i) => (
                <motion.div
                  key={`${card._type}-${card.id ?? i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="w-full max-w-full"
                >
                  <ParticleCard
                    glowColor="37, 99, 235"
                    enableStars={false}
                    className="carbon-card p-5 md:p-8 w-full max-w-full"
                  >
                    {/* Regular project card */}
                    {card._type === "project" && (
                      <>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">
                          {card.title}
                        </h3>

                        <p className="leading-relaxed break-words text-sm mb-4 text-secondary_text">
                          {card.description}
                        </p>

                        {/* Achievements bullets */}
                        {card.achievements && (
                          <ul className="list-disc pl-5 space-y-1 mb-5 text-xs leading-relaxed text-secondary_text">
                            {card.achievements.map((a: string, idx: number) => (
                              <li key={idx}>{a}</li>
                            ))}
                          </ul>
                        )}

                        <div className="flex flex-wrap gap-2 mb-6">
                          {(card.technologies || (typeof card.tech === "string" ? card.tech.split(",") : [])).map((t: string) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 font-mono font-medium border border-border bg-[#e0e0e0] text-black dark:bg-[#393939] dark:text-white"
                            >
                              {t.trim()}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm relative z-10">
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
                      </>
                    )}

                    {/* Upcoming project card */}
                    {card._type === "upcoming" && (
                      <>
                        {card.reveal ? (
                          <>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                              {card.title}
                            </h3>
                            <p className="leading-relaxed break-words text-sm mb-6 text-secondary_text">
                              {card.description}
                            </p>
                            <span className="inline-flex items-center text-xs px-2.5 py-0.5 font-mono bg-layer text-primary border border-primary font-medium">
                              Upcoming Project
                            </span>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <span className="text-3xl mb-4">🚀</span>
                            <h3 className="text-lg font-semibold mb-2 text-foreground">
                              Classified Engine
                            </h3>
                            <p className="text-xs max-w-xs text-secondary_text">
                              Under active development. Details will be unlocked soon.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </ParticleCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}