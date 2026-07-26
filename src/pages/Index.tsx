import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, User, MapPin, GraduationCap, Briefcase, Sparkles, Code, CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  useEffect(() => {
    document.title = "Hariom Acharya | Full Stack & AI/ML Engineer";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Hariom Acharya — Full-Stack & AI/ML Engineer, final-year Computer Science and Engineering student at LDRP-ITR."
      );
    }
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. ABOUT ME INFORMATION SECTION */}
      <section className="py-12 relative border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="p-8 md:p-10 rounded-3xl border border-border bg-layer/40 shadow-sm space-y-8">
            
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border/50 pb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider">
                <User size={14} /> Information About Me
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <span>Read Full Story & Bio</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
                Full-Stack & AI/ML Engineer based in Gandhinagar, Gujarat.
              </h2>

              <p className="text-secondary_text text-base md:text-lg leading-relaxed">
                I am a final-year Computer Science and Engineering student at <strong className="text-foreground">LDRP Institute of Technology and Research (LDRP-ITR)</strong>. I specialize in building scalable web applications, machine learning threat classifiers, intelligent conversational agents, and high-performance financial systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-border/60 bg-background/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <MapPin size={14} className="text-blue-500" /> Location
                  </div>
                  <p className="text-xs text-secondary_text font-medium">Gandhinagar, India</p>
                </div>

                <div className="p-4 rounded-2xl border border-border/60 bg-background/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <GraduationCap size={14} className="text-blue-500" /> Education
                  </div>
                  <p className="text-xs text-secondary_text font-medium">B.Tech CSE (LDRP-ITR)</p>
                </div>

                <div className="p-4 rounded-2xl border border-border/60 bg-background/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Sparkles size={14} className="text-blue-500" /> Academics
                  </div>
                  <p className="text-xs text-secondary_text font-medium">CGPA 8.64 / SPI 9.29</p>
                </div>

                <div className="p-4 rounded-2xl border border-border/60 bg-background/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Briefcase size={14} className="text-blue-500" /> Experience
                  </div>
                  <p className="text-xs text-secondary_text font-medium">Intern @ NST Private Ltd</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-secondary_text font-mono">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Available for Full-Time Software & AI Engineering Roles</span>
                </div>

                <Link
                  to="/about"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm"
                >
                  <span>More About Me</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;