import { useState } from "react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import CertificatesSection from "@/components/CertificatesSection";


const Index = () => {

  const [lightMode, setLightMode] = useState(false);

  return (

    <div
      className={`relative min-h-screen overflow-x-hidden transition-all duration-700 ease-in-out
      ${
        lightMode
          ? "bg-[linear-gradient(180deg,#faf8ff,#efe9ff)] text-gray-900"
          : "bg-[radial-gradient(circle_at_50%_100%,rgba(140,90,255,0.35),transparent_55%),linear-gradient(180deg,#0b0f2a,#1a1145,#0b0f2a)] text-white"
      }
      `}
    >
    

      <Navbar lightMode={lightMode} setLightMode={setLightMode} />

      <HeroSection lightMode={lightMode} />

      <AboutSection lightMode={lightMode} />

      <SkillsSection lightMode={lightMode} />
  

      <CertificatesSection lightMode={lightMode} />

      <ProjectsSection lightMode={lightMode} />

      <ExperienceSection lightMode={lightMode} />

      <ContactSection lightMode={lightMode} />

      <FeedbackSection lightMode={lightMode} />

      <Footer lightMode={lightMode} />

    </div>

  );

};

export default Index;