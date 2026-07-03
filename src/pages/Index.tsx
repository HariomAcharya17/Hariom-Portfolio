import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhoAmISection from "@/components/WhoAmISection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import CertificatesSection from "@/components/CertificatesSection";
import NowBuilding from "@/components/NowBuilding";
import { playUISound } from "@/lib/sound";

const Index = () => {

  const [lightMode, setLightMode] = useState(true);

  // Global click interceptor for UI Sound Effects
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect if click was on a clickable element
      const interactiveEl = target.closest("a, button, input[type='submit'], [role='button'], .cursor-pointer");
      if (interactiveEl) {
        if (interactiveEl.classList.contains("theme-toggle") || interactiveEl.closest(".theme-toggle")) {
          playUISound("toggle");
        } else {
          playUISound("click");
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (

    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-fast ease-in-out bg-background text-foreground ${
        lightMode ? "" : "dark"
      }`}
    >


      <Navbar lightMode={lightMode} setLightMode={setLightMode} />

      <HeroSection lightMode={lightMode} />

      <AboutSection lightMode={lightMode} />

      <SkillsSection lightMode={lightMode} />


      <CertificatesSection lightMode={lightMode} />

      <ProjectsSection lightMode={lightMode} />

      <ExperienceSection lightMode={lightMode} />
      <NowBuilding lightMode={lightMode} />

      <WhoAmISection lightMode={lightMode} />

      <ContactSection lightMode={lightMode} />

      <FeedbackSection lightMode={lightMode} />

      <Footer lightMode={lightMode} />

    </div>

  );

};

export default Index;