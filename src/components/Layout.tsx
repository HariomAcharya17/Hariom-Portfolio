import { useState, useEffect, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import ScrollEnhancer from "@/components/ui/ScrollEnhancer";
import { playUISound } from "@/lib/sound";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [lightMode, setLightMode] = useState(true);

  // Global click interceptor for UI Sound Effects
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect if click was on a clickable element
      const interactiveEl = target.closest("a, button, input[type='submit'], [role='button'], .cursor-pointer");
      if (interactiveEl) {
        if (interactiveEl.classList.contains("theme-toggle") || interactiveEl.closest(".theme-toggle")) {
          // Handled directly in the Navbar component
          return;
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
      <ScrollToTop />
      <ScrollEnhancer />
      <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      <main className="min-h-screen">
        {children}
      </main>
      {/* FLOATING SCROLL TO TOP BUTTON ON EVERY PAGE */}
      <ScrollToTopButton />
      <Footer lightMode={lightMode} />
    </div>
  );
}
