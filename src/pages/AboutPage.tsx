import { useEffect } from "react";
import AboutSection from "@/components/AboutSection";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn more about Hariom Acharya: Full Stack & AI/ML Engineer, background, education, and developer philosophy."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <AboutSection />
    </div>
  );
}
