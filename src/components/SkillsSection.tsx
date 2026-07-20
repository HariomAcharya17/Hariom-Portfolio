import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Layout, Server, Brain, Cloud, Terminal, Code, Wrench, Cpu } from "lucide-react";
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
  if (t.includes("front") || t.includes("web") || t.includes("design") || t.includes("development")) return Layout;
  if (t.includes("back") || t.includes("api") || t.includes("server") || t.includes("data") || t.includes("database")) return Server;
  if (t.includes("machine") || t.includes("learning") || t.includes("ai") || t.includes("model")) return Brain;
  if (t.includes("cloud") || t.includes("devops") || t.includes("network") || t.includes("infra")) return Cloud;
  if (t.includes("programming") || t.includes("code")) return Code;
  if (t.includes("tool")) return Wrench;
  return Terminal;
};

const getSkillGroupColors = (title: string, isDark: boolean): SkillColors => {
  const t = title.toLowerCase();
  if (t.includes("web") || t.includes("front") || t.includes("development")) {
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
  if (t.includes("programming") || t.includes("code")) {
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
  if (t.includes("tool")) {
    // Orange/Amber theme
    return isDark ? {
      hoverBg: "rgba(245, 158, 11, 0.15)",
      hoverText: "#fffbeb",
      hoverSubtitle: "#fef3c7",
      iconBg: "rgba(245, 158, 11, 0.12)",
      hoverIconBg: "#f59e0b",
      hoverIconColor: "#ffffff",
      orbColor: "#f59e0b",
    } : {
      hoverBg: "#fef3c7", // Amber-100
      hoverText: "#b45309", // Amber-700
      hoverSubtitle: "#d97706", // Amber-600
      iconBg: "rgba(245, 158, 11, 0.08)",
      hoverIconBg: "#f59e0b",
      hoverIconColor: "#ffffff",
      orbColor: "#fde68a",
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
  if (t.includes("web") || t.includes("front") || t.includes("development")) {
    return {
      desc: "Building modern, scalable full-stack web applications with interactive frontends and secure, robust databases.",
      highlights: [
        "Structuring single-page web applications with React components.",
        "Engineering responsive API servers and middleware using Node.js.",
        "Implementing flexible schemas using MongoDB and Supabase backends."
      ]
    };
  }
  if (t.includes("programming") || t.includes("code")) {
    return {
      desc: "Writing clean, efficient, and well-structured code using modern languages and core computer science principles.",
      highlights: [
        "Developing performant backend algorithms in Python and C++.",
        "Crafting interactive client-side web behavior using modern JavaScript.",
        "Structuring semantics and clean layouts with HTML5 & CSS3."
      ]
    };
  }
  if (t.includes("machine") || t.includes("learning") || t.includes("ai") || t.includes("model")) {
    return {
      desc: "Designing intelligent models, extracting analytical insights, and engineering processing pipelines for complex data structures.",
      highlights: [
        "Building predictive classification models using Scikit-Learn.",
        "Designing deep neural networks for advanced pattern recognition.",
        "Cleaning, filtering, and preparing massive datasets for pipeline consumption."
      ]
    };
  }
  if (t.includes("tool") || t.includes("system")) {
    return {
      desc: "Utilizing professional IDEs, version control systems, and simulation environments to streamline hardware-software integration.",
      highlights: [
        "Managing codebase versions and pipeline deployments through Git & GitHub.",
        "Programming firmware and sensory controls in Arduino IDE.",
        "Simulating network routing, topology, and node firewalls in Packet Tracer."
      ]
    };
  }
  
  // Fallback
  return {
    desc: `Developing engineering solutions, integrating modern software practices, and building robust components in ${title}.`,
    highlights: [
      "Leveraging industry-standard tools and design patterns.",
      "Structuring clean code, robust logic, and high-performance functionality.",
      "Applying computer science fundamentals to solve complex problems."
    ]
  };
};

interface SkillDetail {
  logo: string;
  category: string;
  color: string;
  desc: string;
}

const SKILL_DETAILS: Record<string, SkillDetail> = {
  "c": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
    category: "System Programming",
    color: "#00599C",
    desc: "A powerful general-purpose programming language for systems and low-level development."
  },
  "c++": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    category: "System Programming",
    color: "#00599C",
    desc: "An extension of C, supporting object-oriented features and high-performance applications."
  },
  "python": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    category: "General Programming",
    color: "#3776AB",
    desc: "A versatile, high-level language popular for scripting, web backend, and AI/data science."
  },
  "html": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    category: "Markup Language",
    color: "#E34F26",
    desc: "The standard markup language for creating structural elements of web pages."
  },
  "css": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    category: "Styling Language",
    color: "#1572B6",
    desc: "Style sheet language used for describing the presentation and layout of web documents."
  },
  "javascript": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    category: "Web Scripting",
    color: "#F7DF1E",
    desc: "The scripting language of the web, enabling interactive interfaces and fullstack apps."
  },
  "typescript": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    category: "Type-Safe Javascript",
    color: "#3178C6",
    desc: "A typed superset of JavaScript that compiles to plain JavaScript, enhancing developer velocity."
  },
  "react": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    category: "Frontend Library",
    color: "#61DAFB",
    desc: "A popular JavaScript library for building component-based user interfaces."
  },
  "node.js": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    category: "Backend Runtime",
    color: "#339933",
    desc: "A JavaScript runtime built on Chrome's V8 JavaScript engine for network applications."
  },
  "mongodb": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    category: "NoSQL Database",
    color: "#47A248",
    desc: "A source-available cross-platform document-oriented database program."
  },
  "supabase": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    category: "Backend-as-a-Service",
    color: "#3ECF8E",
    desc: "An open source Firebase alternative providing database, auth, and real-time listeners."
  },
  "vs code": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    category: "Code Editor",
    color: "#007ACC",
    desc: "A powerful, extensible source-code editor developed by Microsoft."
  },
  "github": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    category: "Version Control",
    color: "#181717",
    desc: "A platform for hosting development version control and collaboration using Git."
  },
  "ardiuno ide": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
    category: "Hardware IDE",
    color: "#00979D",
    desc: "Software environment for writing and uploading code to Arduino-compatible boards."
  },
  "arduino ide": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
    category: "Hardware IDE",
    color: "#00979D",
    desc: "Software environment for writing and uploading code to Arduino-compatible boards."
  },
  "cisco packet tracer": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cisco/cisco-original.svg",
    category: "Networking Tool",
    color: "#1BA0D7",
    desc: "A multi-faceted network simulation tool for practicing networking configurations."
  },
  "python idle": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    category: "Development Tool",
    color: "#3776AB",
    desc: "Integrated Development and Learning Environment bundled with standard Python."
  },
  "machine learning": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    category: "Artificial Intelligence",
    color: "#FF6F00",
    desc: "Developing algorithms that allow computers to learn patterns from data and make decisions."
  },
  "deep learning": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    category: "Artificial Intelligence",
    color: "#EE4C2C",
    desc: "Using multi-layered neural networks to model complex abstractions and high-dimensional patterns."
  },
  "data processing": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    category: "Data Science",
    color: "#150458",
    desc: "Cleaning, transforming, and structuring raw data into formats suitable for analysis."
  }
};

const getSkillDetails = (name: string): SkillDetail => {
  const norm = name.toLowerCase().trim();
  if (SKILL_DETAILS[norm]) {
    return SKILL_DETAILS[norm];
  }
  for (const key of Object.keys(SKILL_DETAILS)) {
    if (norm.includes(key) || key.includes(norm)) {
      return SKILL_DETAILS[key];
    }
  }
  return {
    logo: "",
    category: "Technology",
    color: "#4f46e5",
    desc: `Experience and proficiency in working with ${name}.`
  };
};

const parseSkills = (skillString: string): string[] => {
  return skillString
    .split(/[\n\t•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s !== "•");
};

interface InteractiveSkillBadgeProps {
  name: string;
  lightMode: boolean;
}

function InteractiveSkillBadge({ name, lightMode }: InteractiveSkillBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const details = getSkillDetails(name);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="skill-badge-container"
        style={{ "--orb-color": details.color } as React.CSSProperties}
      >
        {details.logo ? (
          <img
            src={details.logo}
            alt={name}
            className="skill-badge-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <Terminal size={14} className="opacity-60" />
        )}
        <span className="font-sans font-medium tracking-wide">
          {name}
        </span>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 4, scale: 0.95, x: "-50%" }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="skill-badge-tooltip"
            style={{
              borderTop: `3px solid ${details.color}`,
              boxShadow: lightMode
                ? `0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px ${details.color}15`
                : `0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px ${details.color}25`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-lg bg-layer border border-border flex items-center justify-center w-8 h-8 shrink-0">
                {details.logo ? (
                  <motion.img
                    src={details.logo}
                    alt={name}
                    className="w-5 h-5 object-contain"
                    animate={{ rotate: [0, 4, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  />
                ) : (
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground leading-tight">
                  {name}
                </h4>
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block">
                  {details.category}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {details.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SkillsSectionProps {
  lightMode: boolean;
}

interface SkillGroup {
  title: string;
  skills: string[];
}

export default function SkillsSection({ lightMode }: SkillsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from("skills").select("*");

      if (!error && data) {
        const grouped: Record<string, string[]> = {};
        data.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }
          const parsed = parseSkills(item.name);
          grouped[item.category].push(...parsed);
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
          Skills & Technologies
        </ScrollFloat>

        {/* Carbon Tile Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full max-w-none mx-auto carbon-card overflow-visible"
        >
          {/* Window Header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer rounded-t-2xl">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              skills_dashboard.tsx
            </span>
          </div>

          {/* Content */}
          <div className="p-4 md:p-10">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {activeSkillGroups.map((group, i) => {
                const colors = getSkillGroupColors(group.title, !lightMode);
                const IconComponent = getCategoryIcon(group.title);
                const details = getCategoryDetails(group.title);

                const cardStyle = {
                  "--hover-bg": colors.hoverBg,
                  "--hover-text": colors.hoverText,
                  "--hover-subtitle": colors.hoverSubtitle,
                  "--icon-bg": colors.iconBg,
                  "--hover-icon-bg": colors.hoverIconBg,
                  "--hover-icon-color": colors.hoverIconColor,
                  "--orb-color": colors.orbColor,
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
                    {/* Inner wrapper for glow effect clipping */}
                    <div className="skill-card-bg" />

                    <div className="skill-card-icon-container">
                      <IconComponent size={22} className="transition-colors duration-500" />
                    </div>

                    <h3 className="skill-card-title">{group.title}</h3>

                    <p className="skill-card-subtitle">{details.desc}</p>

                    {/* Highlights bullet list */}
                    <div className="mb-6 space-y-2.5 w-full text-left">
                      {details.highlights.map((h, idx) => (
                        <div key={idx} className="skill-card-bullet">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: "var(--orb-color)" }}
                            fill="currentColor"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          <span
                            className="skill-card-bullet-text text-xs leading-normal"
                            dangerouslySetInnerHTML={{ __html: h }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2.5 z-10 relative pt-1 w-full">
                      {group.skills.map((skill: string) => (
                        <InteractiveSkillBadge
                          key={skill}
                          name={skill}
                          lightMode={lightMode}
                        />
                      ))}
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