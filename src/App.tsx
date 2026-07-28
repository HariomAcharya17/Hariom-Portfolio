import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import Loader from "@/components/Loader";
import Layout from "@/components/Layout";
import CommandPalette from "@/components/CommandPalette";
import Index from "./pages/Index.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import VoxHireCaseStudy from "./pages/VoxHireCaseStudy.tsx";
import PhishGuardCaseStudy from "./pages/PhishGuardCaseStudy.tsx";
import ExperiencePage from "./pages/ExperiencePage.tsx";
import SkillsPage from "./pages/SkillsPage.tsx";
import NowPage from "./pages/NowPage.tsx";
import ResumePage from "./pages/ResumePage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import AIPage from "./pages/AIPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ✅ LOADER */}
        <AnimatePresence>
          {loading && (
            <Loader onFinish={() => setLoading(false)} />
          )}
        </AnimatePresence>

        {/* ✅ MAIN APP */}
        {!loading && (
          <BrowserRouter>
            <CommandPalette />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/vox-hire" element={<VoxHireCaseStudy />} />
                <Route path="/projects/phish-guard" element={<PhishGuardCaseStudy />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/now" element={<NowPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/ai" element={<AIPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <Analytics />
          </BrowserRouter>
        )}

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;