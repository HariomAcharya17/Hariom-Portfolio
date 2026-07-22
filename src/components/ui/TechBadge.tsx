import React from "react";
import { Layout, Server, Database, Brain, Wrench, Code2 } from "lucide-react";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export type TechCategory = "Frontend" | "Backend" | "Database" | "AI / ML" | "Tools & Cloud";

export const getTechCategory = (name: string): TechCategory => {
  const n = name.trim().toLowerCase();
  
  // Frontend
  if (
    n.includes("html") || n.includes("css") || n.includes("tailwind") || n.includes("react") ||
    n.includes("next") || n.includes("vue") || n.includes("angular") || n.includes("svelte") ||
    n.includes("bootstrap") || n.includes("sass") || n.includes("redux") || n.includes("frontend") ||
    n.includes("framer") || n.includes("motion") || n.includes("ui") || n.includes("web audio") || n.includes("canvas")
  ) {
    return "Frontend";
  }

  // Database
  if (
    n.includes("postgres") || n.includes("supabase") || n.includes("mongo") || n.includes("redis") ||
    n.includes("mysql") || n.includes("sqlite") || n.includes("firebase") || n.includes("sql") ||
    n.includes("database") || n.includes("db") || n.includes("prisma")
  ) {
    return "Database";
  }

  // AI / ML / IoT
  if (
    n.includes("scikit") || n.includes("sklearn") || n.includes("tensorflow") || n.includes("pytorch") ||
    n.includes("numpy") || n.includes("pandas") || n.includes("opencv") || n.includes("esp32") ||
    n.includes("arduino") || n.includes("iot") || n.includes("ml") || n.includes("ai") ||
    n.includes("colab") || n.includes("kaggle") || n.includes("gemini") || n.includes("openai") ||
    n.includes("virustotal") || n.includes("whois") || n.includes("model")
  ) {
    return "AI / ML";
  }

  // Tools & Cloud (Check tools BEFORE generic backend keywords)
  if (
    n.includes("vercel") || n.includes("github") || n.includes("git") || n.includes("docker") ||
    n.includes("aws") || n.includes("postman") || n.includes("vscode") || n.includes("figma") ||
    n.includes("deployment") || n.includes("deploy") || n.includes("cloud") || n.includes("tool")
  ) {
    return "Tools & Cloud";
  }

  // Backend
  if (
    n.includes("node") || n.includes("express") || n.includes("fastapi") || n.includes("python") ||
    n.includes("flask") || n.includes("django") || n.includes("c++") || n.includes("cpp") ||
    n.includes("cplusplus") || n === "c" || n.includes("go") || n.includes("java") ||
    n.includes("rust") || n.includes("php") || n.includes("graphql") || n.includes("rest") ||
    n.includes("backend") || n.includes("server") || n.includes("api") || n.includes("typescript") ||
    n.includes("javascript") || n === "ts" || n === "js"
  ) {
    return "Backend";
  }

  return "Tools & Cloud";
};

// Clean name function to remove prefix words like "Frontend:", "Backend:", "Deployment:"
export const cleanTechName = (rawName: string): string => {
  if (!rawName) return "";
  return rawName
    .replace(/(Frontend|Backend|Database|Deployment|Stack|Tech|Cloud|DevOps|Frameworks):\s*/gi, "")
    .trim();
};

// Render high quality inline brand SVGs for guaranteed 100% icon availability
const renderInlineTechIcon = (rawName: string) => {
  const n = rawName.trim().toLowerCase().replace(/[^a-z0-9+#]/g, "");

  // Framer Motion
  if (n.includes("framer") || n.includes("motion")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="#F08" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    );
  }

  // Vercel
  if (n.includes("vercel")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="currentColor" d="M12 1L24 22H0L12 1Z"/>
      </svg>
    );
  }

  // HTML / HTML5
  if (n.includes("html")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-12.898-.002.692 8.041h8.675l-.329 3.518-2.76.744-2.775-.747-.178-2.025h-2.61l.348 4.364 5.215 1.448 5.207-1.448.706-7.893H8.531z"/>
      </svg>
    );
  }

  // CSS / CSS3
  if (n.includes("css")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm14.887 6.188L6.444 6.185l.228 2.625 6.002.002-.236 2.625-6.003.003.23 2.622 5.01-.001-.277 3.013-2.392.646-2.412-.647-.154-1.758H3.816l.33 4.298 5.83 1.62 5.817-1.62.8-8.918h-8.08l-.224-2.625h8.312l.223-2.625z"/>
      </svg>
    );
  }

  // Tailwind CSS
  if (n.includes("tailwind")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    );
  }

  // React
  if (n.includes("react")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2">
        <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
      </svg>
    );
  }

  // Next.js
  if (n.includes("next")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.19 18.06l-5.63-7.79v7.79H9.38V5.94h2.25l5.59 7.72V5.94h2.19v12.12h-2.22z"/>
      </svg>
    );
  }

  // Node.js
  if (n.includes("node")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#339933">
        <path d="M12 1.5l10.392 6v12L12 25.5 1.608 19.5v-12L12 1.5z" opacity=".2"/>
        <path d="M12 2l9.526 5.5v11L12 24 2.474 18.5v-11L12 2zm-1.8 11.2V9.8H8.7v4.9c0 1.2.6 1.9 1.8 1.9.9 0 1.4-.4 1.7-1.1v1h1.5V11c0-1.5-.9-2.3-2.4-2.3-1.3 0-2.3.7-2.4 1.9h1.4c.1-.5.5-.8 1-.8.6 0 .9.3.9.9v.3l-1.7.3zm.4.9c-.4 0-.8-.2-.8-.6 0-.4.3-.6.8-.7l1.3-.2v.9c-.3.4-.8.6-1.3.6z"/>
      </svg>
    );
  }

  // Express
  if (n.includes("express")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="currentColor" d="M24 18.3h-3.4l-4.5-5.9-4.5 5.9H8.2l6.2-7.8-5.8-7.5h3.4l4.2 5.5 4.1-5.5h3.4l-5.6 7.3 6.4 8zM5.3 18.3H.8V5h4.5c2.9 0 4.8 1.6 4.8 4.1 0 1.7-.9 3-2.4 3.7l2.8 5.5H8.6l-2.4-5H2.7v5h2.6zm-2.6-7.1h2.2c1.4 0 2.2-.7 2.2-2s-.8-2-2.2-2H2.7v4z"/>
      </svg>
    );
  }

  // FastAPI
  if (n.includes("fastapi")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#009688">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1.09 18l.73-4.58h3.09L11.09 6l-.73 4.58H7.27L13.09 18z"/>
      </svg>
    );
  }

  // Flask
  if (n.includes("flask")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fill="currentColor" d="M10 0v2h.71l-4.7 14.1C5.23 18.36 6.74 20 8.92 20h6.16c2.18 0 3.69-1.64 2.91-3.9L13.29 2H14V0H10zm1.5 4h1l3.5 10.5c.34 1.02-.38 1.5-.92 1.5H8.92c-.54 0-1.26-.48-.92-1.5L11.5 4z"/>
      </svg>
    );
  }

  // Python
  if (n.includes("python")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
        <path fill="#3776AB" d="M11.898 0c-5.46 0-5.114.237-5.114 2.477v2.54h10.228v.766H2.68C.237 5.783 0 7.855 0 11.898c0 4.116.353 6.002 2.68 6.002h1.564v-2.29c0-2.597 2.274-4.837 4.908-4.837h8.188V4.945C17.34 1.258 15.534 0 11.898 0zm-2.46 1.488a.965.965 0 1 1 0 1.93.965.965 0 0 1 0-1.93z"/>
        <path fill="#FFD43B" d="M12.102 24c5.46 0 5.114-.237 5.114-2.477v-2.54H7.017v-.766h14.331c2.443 0 2.652-2.072 2.652-6.115 0-4.116-.353-6.002-2.652-6.002h-1.564v2.29c0 2.597-2.274 4.837-4.908 4.837H6.671v5.833c0 3.687 1.806 4.945 5.441 4.945zm2.46-1.488a.965.965 0 1 1 0-1.93.965.965 0 0 1 0 1.93z"/>
      </svg>
    );
  }

  // PostgreSQL
  if (n.includes("postgres")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#4169E1">
        <path d="M12 0C6.9 0 2.8 3.7 2.1 8.6c-.6 4 1.2 7.9 4.6 9.9 1.7 1 3.6 1.5 5.5 1.5h.3c.7-.1 1.4-.4 2-.8l.2.2c-.3.8-.9 1.5-1.7 1.9l-.6.3 1.2 2 1.3-.7c1.7-1 2.9-2.7 3.3-4.6.8-4.2-.8-8.5-4.2-11C13.2.4 12.6 0 12 0z"/>
      </svg>
    );
  }

  // Supabase
  if (n.includes("supabase")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#3ECF8E">
        <path d="M13.35 24v-8.83h7.24c.78 0 1.2-.91.69-1.5L9.3.26C8.82-.29 8 0 8 .73v8.83H.76c-.78 0-1.2.91-.69 1.5L12.05 23.74c.48.55 1.3.26 1.3-.47z"/>
      </svg>
    );
  }

  // MongoDB
  if (n.includes("mongo")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 0s-5.4 6.8-5.4 12.3c0 4.1 2.4 7.6 5.4 9.7 3-2.1 5.4-5.6 5.4-9.7C17.4 6.8 12 0 12 0zm.6 23.8v-6.9c.7-.2 1.3-.7 1.3-1.4 0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5c0 .7.6 1.2 1.3 1.4v6.9h.4z"/>
      </svg>
    );
  }

  // TypeScript / TS
  if (n.includes("typescript") || n === "ts") {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#3178C6">
        <path d="M0 0h24v24H0z"/>
        <path fill="#fff" d="M1.5 1.5v21h21v-21h-21zm10.1 13.9c0 2.2-1.6 3.6-4.2 3.6-1.5 0-2.8-.4-3.7-1l.7-1.8c.8.5 1.9.9 3 .9 1.3 0 2.1-.6 2.1-1.5 0-.9-.7-1.3-2.1-1.8-2.2-.8-3.4-1.8-3.4-3.5 0-2.1 1.7-3.6 4.1-3.6 1.3 0 2.4.3 3.2.8l-.7 1.8c-.7-.4-1.6-.7-2.6-.7-1.2 0-1.8.6-1.8 1.3 0 .8.7 1.2 2.2 1.7 2.3.8 3.2 1.9 3.2 3.8zm9.2-8.5h-3.4v10.4h-2.3V6.9h-3.4V5h9.1v1.9z"/>
      </svg>
    );
  }

  // JavaScript / JS
  if (n.includes("javascript") || n === "js") {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#F7DF1E">
        <path d="M0 0h24v24H0z"/>
        <path fill="#000" d="M12.7 18.2c.8.5 1.7.9 2.7.9 1.1 0 1.7-.5 1.7-1.3 0-.8-.6-1.2-2-1.7-2.1-.8-3.5-1.9-3.5-3.8 0-2.2 1.7-3.8 4.4-3.8 1.4 0 2.6.4 3.4.9l-.8 1.9c-.6-.4-1.5-.7-2.5-.7-1.1 0-1.7.5-1.7 1.2 0 .8.7 1.1 2.1 1.7 2.3.9 3.4 2 3.4 3.9 0 2.4-1.8 3.9-4.7 3.9-1.6 0-3-.4-3.9-1l.9-2.1zm-7.6-.2c.6.4 1.4.7 2.2.7 1.2 0 1.9-.6 1.9-2.2V8.6h2.5v8.1c0 2.9-1.7 4.3-4.3 4.3-1.4 0-2.7-.4-3.5-1l1.2-2z"/>
      </svg>
    );
  }

  // GitHub
  if (n.includes("github")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    );
  }

  // Docker
  if (n.includes("docker")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#2496ED">
        <path d="M13.98 11.08h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm-3.18 0h2.12v2.12H4.44zm6.36-3.18h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm3.18-3.18h2.12v2.12h-2.12zM23.76 13c-.36-.24-.96-.36-1.56-.36-.48 0-.96.12-1.44.24-.36.12-.72.24-1.08.24-.6 0-1.08-.24-1.44-.6-.24-.24-.48-.6-.6-1.08-.12-.36-.12-.84-.12-1.32v-.36h-2.16v.36c0 .84.12 1.68.36 2.4.24.84.72 1.44 1.32 1.92.6.48 1.44.84 2.28.84 1.08 0 2.04-.36 2.88-.96.24-.24.48-.48.6-.72l.36-.6z"/>
      </svg>
    );
  }

  // AWS
  if (n.includes("aws")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm-1.2 17.5c-2.8 0-4.8-1.5-4.8-3.8 0-2.3 2.1-3.6 5.1-3.6h.9v-.5c0-.9-.6-1.4-1.7-1.4-1 0-2.1.3-3.1.9l-.7-1.4c1.3-.8 2.8-1.2 4.2-1.2 2.3 0 3.6 1.1 3.6 3.1v5.1h-1.6v-.9c-.6.7-1.4 1.1-2.4 1.1zm1.2-4.5h-.7c-1.8 0-3 1-3 2.2 0 1.2 1.1 1.9 2.5 1.9 1.1 0 2-.6 2.4-1.5v-2.6z"/>
      </svg>
    );
  }

  // Scikit-Learn / ML
  if (n.includes("scikit") || n.includes("sklearn")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
        <path fill="#F7931E" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.6 3.8-7.6 3.8-7.6-3.8L12 4.2zM4.4 9.1l6.6 3.3v7.3l-6.6-3.3V9.1zm15.2 7.3l-6.6 3.3v-7.3l6.6-3.3v7.3z"/>
      </svg>
    );
  }

  // ESP32 / Arduino / IoT
  if (n.includes("esp32") || n.includes("arduino") || n.includes("iot")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#00979D">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 12.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm6 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    );
  }

  // Category lucide fallback icon if non-standard string
  const cat = getTechCategory(rawName);
  if (cat === "Frontend") return <Layout className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
  if (cat === "Backend") return <Server className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
  if (cat === "Database") return <Database className="w-3.5 h-3.5 text-purple-500 shrink-0" />;
  if (cat === "AI / ML") return <Brain className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
  if (cat === "Tools & Cloud") return <Wrench className="w-3.5 h-3.5 text-sky-500 shrink-0" />;

  return <Code2 className="w-3.5 h-3.5 text-primary shrink-0" />;
};

export default function TechBadge({ name, className = "" }: TechBadgeProps) {
  const cleanedName = cleanTechName(name);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 font-mono font-semibold border border-border/80 bg-layer/70 text-foreground rounded-lg transition-all hover:border-primary/40 hover:bg-layer shadow-sm select-none ${className}`}
    >
      {renderInlineTechIcon(cleanedName || name)}
      <span>{(cleanedName || name).trim()}</span>
    </span>
  );
}
