import { useEffect } from "react";
import ExperienceSection from "@/components/ExperienceSection";

export default function ExperiencePage() {
  useEffect(() => {
    document.title = "Experience | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "View Hariom Acharya's software engineering experience, timeline, internships, and technical milestones."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <ExperienceSection />
    </div>
  );
}
