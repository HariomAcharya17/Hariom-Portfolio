import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Sparkles, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";
import ViewProjectButton from "@/components/ui/ViewProjectButton";
import LiveDemoButton from "@/components/ui/LiveDemoButton";
import TechBadge from "@/components/ui/TechBadge";

export default function VoxHireCaseStudy() {
  useEffect(() => {
    document.title = "Vox-Hire Case Study | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Deep dive engineering case study for Vox-Hire: AI-powered adaptive mock interview platform built with React, FastAPI, Node.js, and OpenAI/Gemini APIs."
      );
    }
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-secondary_text hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to All Projects
        </Link>

        {/* Case Study Header */}
        <div className="mb-12 border-b border-border/50 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
            <Sparkles size={16} /> Flagship AI Engineering Case Study
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Vox-Hire: AI-Powered Adaptive Mock Interview Engine
          </h1>
          <p className="text-lg text-secondary_text leading-relaxed max-w-3xl mb-6">
            An intelligent recruitment platform that dynamically evaluates candidate responses, conducts adaptive technical interviews, and generates detailed feedback reports.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["React", "FastAPI", "Python", "Node.js", "OpenAI API", "Gemini API", "Tailwind CSS"].map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <ViewProjectButton href="https://github.com/HariomAcharya17">
              GitHub Repo
            </ViewProjectButton>
            <LiveDemoButton href="https://vox-hire.vercel.app">
              Live Demo
            </LiveDemoButton>
          </div>
        </div>

        {/* 4 CASE STUDY SECTIONS */}
        <div className="space-y-12">
          
          {/* 1. PROBLEM */}
          <section className="bg-layer/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-mono text-sm font-bold">1</span>
              Problem Statement
            </h2>
            <p className="text-secondary_text leading-relaxed text-sm md:text-base">
              Traditional mock interview tools rely on static, pre-scripted question banks that fail to simulate authentic technical interviews. Candidates rarely receive personalized, actionable feedback on their answers, while recruiters struggle with preliminary candidate screening at scale. Vox-Hire addresses this by creating a real-time conversational AI interviewer that adapts questioning based on candidate responses.
            </p>
          </section>

          {/* 2. APPROACH */}
          <section className="bg-layer/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-mono text-sm font-bold">2</span>
              Technical Approach & Architecture
            </h2>
            <div className="space-y-4 text-secondary_text text-sm md:text-base leading-relaxed">
              <p>
                Vox-Hire was architected around a hybrid microservices setup: a high-speed React SPA frontend paired with a FastAPI backend service dedicated to low-latency LLM inference and response parsing.
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li><strong className="text-foreground">Adaptive LLM Prompt Pipeline:</strong> Orchestrated dynamic system prompts combining candidate background, target role parameters, and past answer evaluation scores.</li>
                <li><strong className="text-foreground">Dual-Engine Fallback:</strong> Integrated primary streaming via Google Gemini API with seamless fallback to OpenAI GPT-4o to maintain uninterrupted availability.</li>
                <li><strong className="text-foreground">Structured Feedback Engine:</strong> Formatted qualitative evaluation output into structured JSON schemas for automated scoring on technical accuracy, communication clarity, and problem-solving velocity.</li>
              </ul>
            </div>
          </section>

          {/* 3. OUTCOME */}
          <section className="bg-layer/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-sm font-bold">3</span>
              Outcome & Impact
            </h2>
            <div className="space-y-3 text-secondary_text text-sm md:text-base leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p>Delivered a production-ready conversational interview interface capable of maintaining multi-turn context across technical domain topics.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p>Generated comprehensive candidate diagnostic cards summarizing technical strengths, improvement areas, and suggested study topics.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p>Selected as a flagship personal engineering project and recognized for creative integration of multi-model LLM APIs.</p>
              </div>
            </div>
          </section>

          {/* 4. WHAT I'D DO DIFFERENTLY */}
          <section className="bg-layer/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-mono text-sm font-bold">4</span>
              Engineering Reflections — What I'd Do Differently
            </h2>
            <div className="space-y-3 text-secondary_text text-sm md:text-base leading-relaxed">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p><strong className="text-foreground">Implement WebSockets for Voice Streaming:</strong> Transitioning from REST polling to bidirectional WebSockets or WebRTC for audio streaming would significantly lower latency during real-time spoken voice interactions.</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p><strong className="text-foreground">Vector Database Context Memory:</strong> Adding a vector database (e.g. Pinecone or Qdrant) would allow the AI interviewer to index full candidate resumes and job descriptions for even deeper contextual follow-up questions.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
