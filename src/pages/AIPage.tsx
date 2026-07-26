import { useEffect } from "react";
import WhoAmISection from "@/components/WhoAmISection";
import { Bot } from "lucide-react";

export default function AIPage() {
  useEffect(() => {
    document.title = "Ask AI | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Interact with Hariom Acharya's AI assistant to ask questions about projects, technical skills, background, and experience."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="container mx-auto px-6 pt-12 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Bot size={16} /> Interactive AI Assistant
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Ask Hariom's AI Assistant
        </h1>
        <p className="text-secondary_text max-w-xl mx-auto text-sm leading-relaxed mb-6">
          Have questions about my projects, technical stack, architecture decisions, or experience? Ask the custom-trained AI assistant below.
        </p>
      </div>

      <WhoAmISection showOrb={false} />
    </div>
  );
}
