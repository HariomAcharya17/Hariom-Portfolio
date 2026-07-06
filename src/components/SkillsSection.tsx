import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Layout, Server, Brain, Cloud, Terminal } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";
import "./SkillCard.css";

interface SkillColors {
  hoverBg: string;
  hoverText: string;
  hoverSubtitle: string;
  iconBg: string;
  hoverIconBg: string;
  hoverIconColor: string;
  orbColor: string;
}

const getCategoryIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("front") || t.includes("web") || t.includes("design")) return Layout;
  if (t.includes("back") || t.includes("api") || t.includes("server") || t.includes("data") || t.includes("database")) return Server;
  if (t.includes("machine") || t.includes("learning") || t.includes("ai") || t.includes("model")) return Brain;
  if (t.includes("cloud") || t.includes("devops") || t.includes("network") || t.includes("infra")) return Cloud;
  return Terminal;
};

const getSkillGroupColors = (title: string, isDark: boolean): SkillColors => {
  const t = title.toLowerCase();
  if (t.includes("front") || t.includes("web") || t.includes("design")) {
    // Blue theme
    return isDark ? {
      hoverBg: "rgba(15, 98, 254, 0.15)",
      hoverText: "#f8fafc",
      hoverSubtitle: "#cbd5e1",
      iconBg: "rgba(15, 98, 254, 0.12)",
      hoverIconBg: "#0f62fe",
      hoverIconColor: "#ffffff",
      orbColor: "#0f62fe",
    } : {
      hoverBg: "#e0f2fe", // Sky-100
      hoverText: "#0369a1", // Sky-700
      hoverSubtitle: "#0284c7", // Sky-600
      iconBg: "rgba(15, 98, 254, 0.08)",
      hoverIconBg: "#0f62fe",
      hoverIconColor: "#ffffff",
      orbColor: "#bae6fd",
    };
  }
  if (t.includes("back") || t.includes("api") || t.includes("server") || t.includes("data") || t.includes("database")) {
    // Green theme
    return isDark ? {
      hoverBg: "rgba(16, 185, 129, 0.15)",
      hoverText: "#e6f4ea",
      hoverSubtitle: "#a7f3d0",
      iconBg: "rgba(16, 185, 129, 0.12)",
      hoverIconBg: "#10b981",
      hoverIconColor: "#ffffff",
      orbColor: "#10b981",
    } : {
      hoverBg: "#dcfce7", // Green-100
      hoverText: "#15803d", // Green-700
      hoverSubtitle: "#16a34a", // Green-600
      iconBg: "rgba(16, 185, 129, 0.08)",
      hoverIconBg: "#10b981",
      hoverIconColor: "#ffffff",
      orbColor: "#bbf7d0",
    };
  }
  if (t.includes("machine") || t.includes("learning") || t.includes("ai") || t.includes("model")) {
    // Purple theme
    return isDark ? {
      hoverBg: "rgba(168, 85, 247, 0.15)",
      hoverText: "#faf5ff",
      hoverSubtitle: "#ddd6fe",
      iconBg: "rgba(168, 85, 247, 0.12)",
      hoverIconBg: "#a855f7",
      hoverIconColor: "#ffffff",
      orbColor: "#a855f7",
    } : {
      hoverBg: "#f3e8ff", // Purple-100
      hoverText: "#7e22ce", // Purple-700
      hoverSubtitle: "#9333ea", // Purple-600
      iconBg: "rgba(168, 85, 247, 0.08)",
      hoverIconBg: "#a855f7",
      hoverIconColor: "#ffffff",
      orbColor: "#e9d5ff",
    };
  }
  if (t.includes("cloud") || t.includes("devops") || t.includes("network") || t.includes("infra")) {
    // Rose theme
    return isDark ? {
      hoverBg: "rgba(244, 63, 94, 0.15)",
      hoverText: "#fff5f5",
      hoverSubtitle: "#fecdd3",
      iconBg: "rgba(244, 63, 94, 0.12)",
      hoverIconBg: "#f43f5e",
      hoverIconColor: "#ffffff",
      orbColor: "#f43f5e",
    } : {
      hoverBg: "#ffe4e6", // Rose-100
      hoverText: "#be123c", // Rose-700
      hoverSubtitle: "#e11d48", // Rose-600
      iconBg: "rgba(244, 63, 94, 0.08)",
      hoverIconBg: "#f43f5e",
      hoverIconColor: "#ffffff",
      orbColor: "#fecdd3",
    };
  }
  
  // Default Slate theme
  return isDark ? {
    hoverBg: "rgba(71, 85, 105, 0.15)",
    hoverText: "#f8fafc",
    hoverSubtitle: "#cbd5e1",
    iconBg: "rgba(71, 85, 105, 0.12)",
    hoverIconBg: "#475569",
    hoverIconColor: "#ffffff",
    orbColor: "#475569",
  } : {
    hoverBg: "#f1f5f9", // Slate-100
    hoverText: "#334155", // Slate-700
    hoverSubtitle: "#475569", // Slate-600
    iconBg: "rgba(15, 98, 254, 0.08)",
    hoverIconBg: "#0f62fe",
    hoverIconColor: "#ffffff",
    orbColor: "#cbd5e1",
  };
};

interface CategoryDetails {
  desc: string;
  highlights: string[];
}

const getCategoryDetails = (title: string): CategoryDetails => {
  const t = title.toLowerCase();
  if (t.includes("front") || t.includes("web") || t.includes("design")) {
    return {
      desc: "Crafting modern, high-performance interfaces using responsive layouts, atomic component architecture, and fluid visual animations.",
      highlights: [
        "Building scalable single-page web apps with <strong>React</strong> and <strong>Next.js</strong>.",
        "Styling clean interfaces utilizing <strong>Tailwind CSS</strong> and <strong>Carbon design</strong>.",
        "Experience in state-driven UI animations and smooth visual layout motion."
      ]
    };
  }
  if (t.includes("back") || t.includes("api") || t.includes("server") || t.includes("data") || t.includes("database")) {
    return {
      desc: "Developing robust server architectures, REST/GraphQL APIs, secure validation layers, and optimized relational database schemas.",
      highlights: [
        "Constructing high-throughput servers using <strong>Node.js</strong> and <strong>Express</strong>.",
        "Building lightweight, type-safe API routers with Python <strong>FastAPI</strong>.",
        "Managing cloud database nodes using <strong>PostgreSQL</strong> and <strong>Supabase</strong>."
      ]
    };
  }
  if (t.includes("machine") || t.includes("learning") || t.includes("ai") || t.includes("model")) {
    return {
      desc: "Integrating state-of-the-art Large Language Models, constructing conversational interfaces, and training custom statistical models.",
      highlights: [
        "Training classifiers with <strong>Scikit-learn</strong>, <strong>NumPy</strong>, and <strong>Pandas</strong> in Colab.",
        "Integrating smart model endpoints like <strong>OpenAI</strong>, <strong>Gemini</strong>, and <strong>Hugging Face</strong>.",
        "Architecting mock interview engines and LLM prompt templates (Vox-Hire)."
      ]
    };
  }
  if (t.includes("cloud") || t.includes("devops") || t.includes("network") || t.includes("infra")) {
    return {
      desc: "Containerizing services for isolated environments, orchestrating staging environments, and hosting cloud-native storage layers.",
      highlights: [
        "Configuring <strong>Docker</strong> containers for consistent service deployments.",
        "Deploying and managing live client hosting nodes via <strong>Vercel</strong> and database backends.",
        "Deepening skills in cloud security groups, access policies (IAM), and VPC routing."
      ]
    };
  }
  
  // Fallback
  return {
    desc: "Applying foundational computer engineering principles, hardware integration, and packet routing to solve complex software problems.",
    highlights: [
      "Hardware prototyping with <strong>ESP32</strong> microcontrollers and <strong>Arduino IDE</strong>.",
      "Designing networking systems using <strong>Cisco Packet Tracer</strong> routers.",
      "Structuring version control and CI/CD pipelines using Git and GitHub."
    ]
  };
};

interface SkillsSectionProps {
  lightMode: boolean;
}

export default function SkillsSection({ lightMode }: SkillsSectionProps) {
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

  interface SkillGroup {
    title: string;
    skills: string[];
  }

  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*");

      if (!error && data) {
        const grouped: Record<string, string[]> = {};
        data.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }
          grouped[item.category].push(item.name);
        });

        const formatted: SkillGroup[] = Object.keys(grouped).map((category) => ({
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
            <div className="grid md:grid-cols-2 gap-8">
              {activeSkillGroups.map((group, i) => {
                const colors = getSkillGroupColors(group.title, !lightMode);
                const IconComponent = getCategoryIcon(group.title);
                const details = getCategoryDetails(group.title);
                
                const cardStyle = {
                  '--hover-bg': colors.hoverBg,
                  '--hover-text': colors.hoverText,
                  '--hover-subtitle': colors.hoverSubtitle,
                  '--icon-bg': colors.iconBg,
                  '--hover-icon-bg': colors.hoverIconBg,
                  '--hover-icon-color': colors.hoverIconColor,
                  '--orb-color': colors.orbColor,
                } as React.CSSProperties;

                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08 }}
                    className="skill-card"
                    style={cardStyle}
                  >
                    <div className="skill-card-icon-container">
                      <IconComponent size={22} className="transition-colors duration-500" />
                    </div>

                    <h3 className="skill-card-title">
                      {group.title}
                    </h3>

                    <p className="skill-card-subtitle">
                      {details.desc}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="mb-5 space-y-2 w-full text-left">
                      {details.highlights.map((h, idx) => (
                        <div key={idx} className="skill-card-bullet">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--orb-color)' }} fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          <span 
                            className="skill-card-bullet-text text-xs leading-normal"
                            dangerouslySetInnerHTML={{ __html: h }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2.5 z-10 relative pt-1">
                      {group.skills.map((skill: string) => {
                        const skillColors = getSkillColor(skill);
                        return (
                          <span
                            key={skill}
                            className={`skill-card-tag text-xs px-3 py-1 font-mono font-medium border ${skillColors.border} ${skillColors.bg} ${skillColors.text} rounded-md`}
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