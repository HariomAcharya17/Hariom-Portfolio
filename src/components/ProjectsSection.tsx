import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProjectsSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [projects, setProjects] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      console.log("PROJECTS data:", data, "error:", error);

      if (data) setProjects(data);
    };

    const fetchUpcoming = async () => {
      const { data, error } = await supabase
        .from("upcoming_projects")
        .select("*");

      console.log("UPCOMING data:", data, "error:", error);

      if (data) setUpcoming(data);
    };

    fetchProjects();
    fetchUpcoming();

  }, []);

  // Combine both arrays into one flat list for the grid
  const allCards = [
    ...projects.map((p) => ({ ...p, _type: "project" })),
    ...upcoming.map((u) => ({ ...u, _type: "upcoming" })),
  ];

  return (
    <section id="projects" className="py-28 relative overflow-hidden">

      {!lightMode && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-500/20 blur-[180px]" />
      )}

      <div className="container mx-auto px-4 md:px-6" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Projects
        </motion.h2>

        {/* MacBook Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`max-w-6xl mx-auto rounded-xl border w-full ${
            lightMode
              ? "bg-white border-gray-200"
              : "bg-[#0d1117] border-[#30363d]"
          }`}
        >

          {/* Header bar */}
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
            <span className="ml-4 text-sm text-gray-400 font-mono">projects.tsx</span>
          </div>

          <div className="p-5 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">

              {allCards.map((card, i) => (
                <motion.div
                  key={`${card._type}-${card.id ?? i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`border rounded-lg p-5 md:p-8 w-full max-w-full transition-all ${
                    lightMode
                      ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      : "bg-[#161b22] border-[#30363d] hover:bg-[#1c2128]"
                  }`}
                >

                  {/* Regular project card */}
                  {card._type === "project" && (
                    <>
                      <h3 className={`text-xl font-semibold mb-3 ${lightMode ? "text-black" : "text-white"}`}>
                        {card.title}
                      </h3>

                      <p className={`mb-6 leading-relaxed break-words ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
                        {card.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {(typeof card.tech === "string" ? card.tech.split(",") : []).map((t: string) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-md bg-purple-500/15 text-purple-500 border border-purple-500/20"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-6 text-sm">
                        <a
                          href={card.github}
                          className={`flex items-center gap-2 transition ${
                            lightMode ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <Github size={16} />
                          Code
                        </a>
                      </div>
                    </>
                  )}

                  {/* Upcoming project card */}
                  {card._type === "upcoming" && (
                    <>
                      {card.reveal ? (
                        <>
                          <h3 className={`text-xl font-semibold mb-3 ${lightMode ? "text-black" : "text-white"}`}>
                            {card.title}
                          </h3>
                          <p className={`mb-4 break-words ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
                            {card.description}
                          </p>
                          <p className="text-purple-400 text-sm">🚀 Upcoming Project</p>
                        </>
                      ) : (
                        <>
                          <p className="text-purple-400 font-mono mb-3">upcoming_project.tsx</p>
                          <div className="text-gray-400 text-xl mb-2">█████████████</div>
                          <p className="text-gray-400">🔒 Hidden Project</p>
                        </>
                      )}
                    </>
                  )}

                </motion.div>
              ))}

            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
}