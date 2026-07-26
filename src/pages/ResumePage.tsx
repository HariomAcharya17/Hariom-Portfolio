import { useEffect } from "react";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import { FileText, Heart, Brain, Cpu, Cloud, Terminal } from "lucide-react";

export default function ResumePage() {
  useEffect(() => {
    document.title = "Resume | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "View and download Hariom Acharya's official resume and personal engineering drive."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-12 text-center max-w-4xl space-y-10">
        
        {/* RESUME DOWNLOAD HEADER */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Resume
          </h1>
          <p className="text-secondary_text max-w-xl text-sm leading-relaxed">
            Full-Stack & AI/ML Engineer (B.Tech CSE at LDRP-ITR). Download official resume below.
          </p>
          <div className="mt-2">
            <DownloadCVButton href="/resume.pdf">
              Resume
            </DownloadCVButton>
          </div>
        </div>

        {/* WHAT I LOVE TO DO & PERSONAL DRIVE SECTION */}
        <div className="p-8 rounded-3xl border border-border bg-layer/40 shadow-sm text-left space-y-6">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-500 fill-rose-500/20" />
            <h2 className="text-xl font-bold text-foreground">
              What I Love to Do & Personal Drive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-border/60 bg-background/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Brain size={16} className="text-primary" />
                <span>Building Agentic AI Systems</span>
              </div>
              <p className="text-xs text-secondary_text leading-relaxed">
                I am deeply passionate about constructing multi-model agent workflows and adaptive conversational tools (like Vox-Hire) that synthesize natural language with type-safe backend logic.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/60 bg-background/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Cpu size={16} className="text-primary" />
                <span>Real-Time Threat Detection</span>
              </div>
              <p className="text-xs text-secondary_text leading-relaxed">
                I love applying machine learning classifiers to real-time cybersecurity problems (like PhishGuard), training Random Forest statistical models on threat feeds and URL telemetry.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/60 bg-background/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Cloud size={16} className="text-primary" />
                <span>Exploring High-Availability Cloud Architecture</span>
              </div>
              <p className="text-xs text-secondary_text leading-relaxed">
                I enjoy architecting containerized Docker microservices, serverless workers, and studying AWS VPC/IAM design to ensure software stays resilient under heavy load.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/60 bg-background/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Terminal size={16} className="text-primary" />
                <span>Continuous Applied Learning</span>
              </div>
              <p className="text-xs text-secondary_text leading-relaxed">
                I love diving into new technologies (FastAPI, WebAssembly, Supabase, WebSockets) by building real production applications with tangible constraints rather than just reading docs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
