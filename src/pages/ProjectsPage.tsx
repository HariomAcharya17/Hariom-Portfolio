import { useEffect } from "react";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Projects | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore Hariom Acharya's full portfolio of software engineering projects, web applications, AI/ML tools, and verified technical certificates."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20 space-y-12">
      <ProjectsSection isHomePreview={false} />

      <section className="border-t border-border/50 pt-8">
        <CertificatesSection />
      </section>
    </div>
  );
}
