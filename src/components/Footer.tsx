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
      <svg viewBox="0 0 24 24" className="w-10 h-10 select-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" className="text-orange-500" stroke="currentColor" fill="none" />
        <path d="M11 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" className="text-amber-500" stroke="currentColor" fill="none" />
        <path d="M4 6v12M8 6l-4 6 4 6" className="text-blue-500" strokeWidth="2.5" />
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
        <path d="M3 3h18v18H3V3zm12.525 10.742c-.525-.333-1.067-.625-1.575-.917-.4-.233-.675-.433-.675-.75 0-.258.208-.458.558-.458.333 0 .6.15.825.433l1.192-.767c-.433-.65-1.125-.975-1.958-.975-.983 0-1.85.667-1.85 1.692 0 1.258 1.05 1.833 2.058 2.408.575.325.992.6 1.25.867.3.292.4.55.4.825 0 .425-.367.667-.933.667-.625 0-1.025-.317-1.392-.883l-1.225.75c.575 1 1.483 1.425 2.6 1.425 1.5 0 2.458-.8 2.458-2.033 0-1.142-.717-1.783-1.958-2.583z" />
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
      <svg viewBox="0 0 128 128" className="w-10 h-10 select-none">
        <path d="M1.5 1.5h125v125H1.5V1.5z" fill="#3178c6" />
        <path d="M117.2 101.4c0 3.7-1 6.8-3 9.4s-4.8 4.4-8.4 5.4c-3.6 1-7.7 1.5-12.3 1.5-5.9 0-11-.9-15.3-2.7v-13.4c2.2 1.4 5 2.6 8.3 3.6s6.5 1.5 9.7 1.5c4.1 0 7.2-.8 9.2-2.4s3-4.1 3-7.5c0-2.4-.6-4.5-1.9-6.1s-3-2.9-5.1-3.9c-2.1-1-4.7-2-7.8-3-4.2-1.3-8-2.8-11.4-4.5s-6-4-8-7-2.9-7-2.9-12c0-5 1.2-9.2 3.7-12.7s6-6.1 10.6-7.8 9.9-2.6 16-2.6c5.2 0 10 .7 14.3 2v13c-2.4-1.3-5-2.3-8-3.1s-6-.8-9-.8c-3.9 0-6.8.8-8.7 2.4s-2.8 3.8-2.8 6.6c0 2.2.6 4 1.8 5.4s2.8 2.6 4.9 3.6c2.1 1 4.7 1.9 7.8 2.9 4.3 1.4 8.2 2.9 11.6 4.7s6.1 4 8.1 7 3 7.1 3 12.1zm-61.9-51h-17.7v58.2H23.5V50.4H5.8v-11h49.5v11z" fill="#fff" />
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
                  animate={{ opacity: 1, height: 80, marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-3 bg-layer border border-border rounded-2xl text-left shadow-sm h-[80px] relative">
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