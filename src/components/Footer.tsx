import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialMediaGrid from "@/components/ui/SocialMediaGrid";
import "./Footer.css";

interface FooterProps {
  lightMode: boolean;
}

interface ToolData {
  id: string;
  name: string;
  color: string;
  desc: string;
  icon: React.ReactNode;
}

const toolsData: ToolData[] = [
  {
    id: "git",
    name: "Git & GitHub",
    color: "#e11d48", // Rose Red
    desc: "Collaborative code version control, package releases, action deployment integrations, and security checks.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#e11d48] select-none" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    id: "motion",
    name: "Framer Motion",
    color: "#f472b6", // Pink
    desc: "Declarative React animation library used to build entry transitions, physics spring states, and layout transitions.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#f472b6] select-none" fill="currentColor">
        <path d="M12 18l-6-6h12l-6 6zM6 6h12l-6 6L6 6z" />
      </svg>
    )
  },
  {
    id: "colab",
    name: "Colab & Kaggle",
    color: "#fb923c", // Orange
    desc: "Cloud sandboxes utilized to train classifiers, run GPU statistical pipelines, and compute machine learning models.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 select-none" fill="none">
        {/* Colab on the left */}
        <g transform="translate(-1, 5) scale(0.52)">
          <path d="M16.9414 4.9757a7.033 7.033 0 0 0-4.9308 2.0646 7.033 7.033 0 0 0-.1232 9.8068l2.395-2.395a3.6455 3.6455 0 0 1 5.1497-5.1478l2.397-2.3989a7.033 7.033 0 0 0-4.8877-1.9297z" fill="#F9AB00"/>
          <path d="M7.07 4.9855a7.033 7.033 0 0 0-4.8878 1.9316l2.3911 2.3911a3.6434 3.6434 0 0 1 5.0227.1271l2.4048-2.4048A7.033 7.033 0 0 0 7.07 4.9855z" fill="#E87115"/>
          <path d="M12.0127 14.3218a7.033 7.033 0 0 0-.1232-9.8068l-2.395 2.395a3.6455 3.6455 0 0 1-5.1497 5.1478l-2.397 2.3989a7.033 7.033 0 0 0 10.0649-.1349z" fill="#F9AB00"/>
          <path d="M16.93 19.0145a7.033 7.033 0 0 0 4.8878-1.9316l-2.3911-2.3911a3.6434 3.6434 0 0 1-5.0227-.1271l-2.4048 2.4048a7.033 7.033 0 0 0 4.9308 1.98z" fill="#E87115"/>
        </g>
        {/* Kaggle on the right */}
        <g transform="translate(11, 4) scale(0.68)">
          <path d="M18.825 21.85h-3.045l-5.696-7.85-2.093 2.016v5.834H5.195V2.15h2.796v11.166l7.39-7.234h3.693l-7.218 7.025 7.17 8.743z" fill="#20BEFF"/>
        </g>
      </svg>
    )
  },
  {
    id: "js",
    name: "JavaScript",
    color: "#facc15", // Yellow
    desc: "Core scripting logic powering visual DOM transformations, client states, and asynchronous requests.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#facc15] select-none" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    )
  },
  {
    id: "node",
    name: "Node.js",
    color: "#84cc16", // Lime
    desc: "Chrome's V8 runtime engine server runtime hosting API routes and routing local filesystem operations.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#84cc16] select-none" fill="currentColor">
        <path d="M12 2L2 7.75v10.5L12 24l10-5.75V7.75L12 2zm8 14.5l-8 4.6-8-4.6V9.25l8-4.6 8 4.6v7.35zM12 7l6 3.45v6.9L12 20.8l-6-3.45v-6.9L12 7zm0 2.3l-4 2.3v4.6l4 2.3 4-2.3v-4.6l-4-2.3z" />
      </svg>
    )
  },
  {
    id: "supabase",
    name: "Supabase",
    color: "#10b981", // Emerald
    desc: "Open-source cloud backend platform utilized to manage PostgreSQL relational instances, secure API authentication, and store credentials.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-emerald-500 select-none" fill="currentColor">
        <path d="M13.4 2H5.7c-.5 0-.8.5-.6.9l4.5 7.6H3.6c-.5 0-.8.5-.6.9l11.4 11.5c.3.3.8-.1.7-.5l-3.3-8.8h6.9c.5 0 .8-.5.6-.9L14 2.5c-.1-.3-.3-.5-.6-.5z" />
      </svg>
    )
  },
  {
    id: "docker",
    name: "Docker",
    color: "#0ea5e9", // Sky Blue
    desc: "Creating isolated container environments to package backend APIs, Node.js applications, and database engines for zero-friction staging deployments.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#0db7ed] select-none" fill="currentColor">
        <path d="M3 11.5h2v2H3zm3 0h2v2H6zm3 0h2v2H9zm3 0h2v2h-2zm3 0h2v2h-2zm-9-3h2v2H6zm3 0h2v2H9zm3 0h2v2h-2zm-3-3h2v2H9zm9 6h5c.3 0 .5-.2.5-.5V8.5c0-1.7-1.3-3-3-3h-2.5zm-3 3h2v2h-2z" />
        <path d="M1.5 15.5c2 0 3-1.5 5.5-1.5s3.5 1.5 5.5 1.5 3-1.5 5.5-1.5 3.5 1.5 5.5 1.5c1 0 1.5-.5 2-.8v1.8c-.5.5-1.2 1-2.5 1-2 0-3-1.5-5.5-1.5s-3.5 1.5-5.5 1.5-3-1.5-5.5-1.5-3.5 1.5-5.5 1.5c-1.5 0-2.3-.5-2.8-1z" />
      </svg>
    )
  },
  {
    id: "react",
    name: "React & Next.js",
    color: "#3b82f6", // Blue
    desc: "Modern user interface frameworks built on top of state engines, code-splitting routers, and server-side rendering nodes.",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 text-[#61dafb] select-none" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    id: "ts",
    name: "TypeScript",
    color: "#8b5cf6", // Violet
    desc: "A type-safe dialect of JavaScript validating objects, API parameters, and interface props before browser compilation.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#3178c6] select-none" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    )
  },
  {
    id: "claude",
    name: "Claude AI",
    color: "#a78bfa", // Lavender
    desc: "Anthropic's LLM assistant utilized for interactive pair programming, refactoring modular components, and writing clean mock datasets.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#d97706] dark:text-[#f59e0b] select-none" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" />
      </svg>
    )
  }
];

export default function Footer({ lightMode }: FooterProps) {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const selectedTool = toolsData.find((t) => t.id === selectedToolId);

  return (
    <footer className="py-8 border-t border-border bg-background relative z-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: copyright */}
        <div className="flex flex-col gap-1 text-center md:text-left md:w-1/4">
          <span className="text-sm text-secondary_text">
            © 2026 Hariom Acharya. All rights reserved.
          </span>
          <span className="text-xs font-mono text-secondary_text text-secondary_text/85">
            Built with IBM Carbon Design System · IBM Plex
          </span>
        </div>

        {/* Center: Comic Color Palette Swatches & Tool Info Card */}
        <div className="flex flex-col items-center gap-1 md:w-2/4">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] font-mono tracking-wider text-secondary_text uppercase font-semibold opacity-80">
              My Core Dev Toolstack (Click to View)
            </span>
            <div className="comic-panel">
              <div className="container-items">
                {toolsData.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      // Toggle active selection on click
                      setSelectedToolId(selectedToolId === tool.id ? null : tool.id);
                    }}
                    className="item-color"
                    style={{ "--color": tool.color } as React.CSSProperties}
                    aria-color={tool.name}
                    title={tool.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Tool Showcase Panel with dynamic heights */}
          <div className="w-full max-w-sm flex justify-center">
            <AnimatePresence initial={false}>
              {selectedTool && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-3 bg-layer border border-border rounded-2xl text-left shadow-sm min-h-[80px] h-auto relative">
                    <button
                      onClick={() => setSelectedToolId(null)}
                      className="absolute top-2 right-3 text-secondary_text hover:text-foreground text-[10px] font-bold"
                      title="Close"
                    >
                      ✕
                    </button>
                    <div className="shrink-0 flex items-center justify-center p-2 rounded-xl bg-background border border-border/80 shadow-inner">
                      {selectedTool.icon}
                    </div>
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-xs font-bold text-foreground tracking-wide">
                        {selectedTool.name}
                      </span>
                      <span className="text-[10px] text-secondary_text leading-relaxed mt-0.5 line-clamp-2">
                        {selectedTool.desc}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: social media links */}
        <div className="flex justify-end md:pr-8 md:w-1/4">
          <SocialMediaGrid />
        </div>

      </div>
    </footer>
  );
}