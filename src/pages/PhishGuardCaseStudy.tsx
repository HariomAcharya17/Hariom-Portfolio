import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import ViewProjectButton from "@/components/ui/ViewProjectButton";
import LiveDemoButton from "@/components/ui/LiveDemoButton";
import TechBadge from "@/components/ui/TechBadge";

export default function PhishGuardCaseStudy() {
  useEffect(() => {
    document.title = "PhishGuard Case Study | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Deep dive engineering case study for PhishGuard: Real-time phishing threat detection engine built with FastAPI, Random Forest Machine Learning, Python, and VirusTotal API."
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
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 mb-3">
            <ShieldCheck size={16} /> Cybersecurity ML Engineering Case Study
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            PhishGuard: Real-Time ML Phishing Detection Engine
          </h1>
          <p className="text-lg text-secondary_text leading-relaxed max-w-3xl mb-6">
            A security intelligence system utilizing supervised Random Forest classifiers and external threat feeds to identify malicious URLs and domain spoofing in real-time.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["FastAPI", "Python", "Scikit-Learn", "Random Forest", "VirusTotal API", "React", "Tailwind CSS"].map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <ViewProjectButton href="https://github.com/HariomAcharya17">
              GitHub Repo
            </ViewProjectButton>
            <LiveDemoButton href="https://phishguard.vercel.app">
              Live Demo
            </LiveDemoButton>
          </div>
        </div>

        {/* 4 CASE STUDY SECTIONS */}
        <div className="space-y-12">
          
          {/* 1. PROBLEM */}
          <section className="bg-layer/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-sm font-bold">1</span>
              Problem Statement
            </h2>
            <p className="text-secondary_text leading-relaxed text-sm md:text-base">
              Phishing attacks account for over 80% of reported cyber incidents, with attackers constantly generating novel typosquatted domains and obfuscated URLs that bypass static blocklists. Standard browser protection often lags behind zero-day phishing sites. PhishGuard was created to classify raw URL features dynamically using trained statistical models alongside reputational intelligence feeds.
            </p>
          </section>

          {/* 2. APPROACH */}
          <section className="bg-layer/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-sm font-bold">2</span>
              Technical Approach & Architecture
            </h2>
            <div className="space-y-4 text-secondary_text text-sm md:text-base leading-relaxed">
              <p>
                PhishGuard extracts lexical, structural, and domain-level feature vectors from incoming URLs and feeds them into a Random Forest classification pipeline hosted via FastAPI.
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li><strong className="text-foreground">Feature Extraction Engine:</strong> Extracted 16 numerical heuristic features per URL, including entropy scores, IP embedding detection, HTTPS token position, length ratios, and subdomain counts.</li>
                <li><strong className="text-foreground">Random Forest Classifier:</strong> Trained on over 50,000 verified malicious and benign URLs using Scikit-learn, tuned with hyperparameter optimization for low false-positive rates.</li>
                <li><strong className="text-foreground">Threat Intelligence API Integration:</strong> Queried VirusTotal and Google Safe Browsing APIs in parallel to validate suspicious classifications against global threat feeds.</li>
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
                <p>Achieved sub-200ms API inference response times for full URL lexical extraction and Random Forest classification.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p>Built an intuitive threat dashboard providing risk breakdown scores, domain age flags, and detailed risk factors.</p>
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
                <p><strong className="text-foreground">Headless Rendering for Visual Analysis:</strong> Pure lexical feature extraction cannot catch visual spoofing (e.g. cloned login pages). Adding headless Puppeteer screenshot analysis with visual similarity embedding would catch brand impersonation.</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p><strong className="text-foreground">Caching Threat Reputations:</strong> Adding a Redis caching layer for recently checked URLs would reduce external VirusTotal API rate limit bottlenecks.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
