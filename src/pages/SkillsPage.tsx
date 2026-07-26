import { useEffect } from "react";
import SkillsSection from "@/components/SkillsSection";

export default function SkillsPage() {
  useEffect(() => {
    document.title = "Skills | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore Hariom Acharya's technical skills, core languages, frameworks, cloud services, and AI/ML tools."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <SkillsSection />
    </div>
  );
}
