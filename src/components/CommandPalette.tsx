import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Home,
  User,
  FolderGit2,
  Briefcase,
  Code2,
  Clock,
  FileText,
  Mail,
  Sparkles,
  FileCode,
} from "lucide-react";

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandPalette({ open: externalOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const navigate = useNavigate();

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (val: boolean) => {
    setInternalOpen(val);
    if (onOpenChange) onOpenChange(val);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search pages & projects..." />
      <CommandList className="max-h-[350px]">
        <CommandEmpty>No matching results found.</CommandEmpty>
        
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => handleSelect("/")} className="cursor-pointer gap-2.5">
            <Home size={16} className="text-primary" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/about")} className="cursor-pointer gap-2.5">
            <User size={16} className="text-primary" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/projects")} className="cursor-pointer gap-2.5">
            <FolderGit2 size={16} className="text-primary" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/experience")} className="cursor-pointer gap-2.5">
            <Briefcase size={16} className="text-primary" />
            <span>Experience</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/skills")} className="cursor-pointer gap-2.5">
            <Code2 size={16} className="text-primary" />
            <span>Skills & Tools</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/now")} className="cursor-pointer gap-2.5">
            <Clock size={16} className="text-primary" />
            <span>Now Building</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/resume")} className="cursor-pointer gap-2.5">
            <FileText size={16} className="text-primary" />
            <span>Curriculum Vitae / Resume</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/contact")} className="cursor-pointer gap-2.5">
            <Mail size={16} className="text-primary" />
            <span>Contact</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/ai")} className="cursor-pointer gap-2.5">
            <Sparkles size={16} className="text-primary" />
            <span>Ask AI Assistant</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Flagship Case Studies & Projects">
          <CommandItem onSelect={() => handleSelect("/projects/vox-hire")} className="cursor-pointer gap-2.5">
            <FileCode size={16} className="text-amber-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">Vox-Hire (AI Recruitment Case Study)</span>
              <span className="text-[11px] text-secondary_text">Deep dive into adaptive AI mock interview architecture</span>
            </div>
          </CommandItem>

          <CommandItem onSelect={() => handleSelect("/projects/phish-guard")} className="cursor-pointer gap-2.5">
            <FileCode size={16} className="text-emerald-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">PhishGuard (Cybersecurity Case Study)</span>
              <span className="text-[11px] text-secondary_text">Real-time ML phishing classification & threat intelligence</span>
            </div>
          </CommandItem>

          <CommandItem onSelect={() => handleSelect("/projects")} className="cursor-pointer gap-2.5">
            <FolderGit2 size={16} className="text-secondary_text" />
            <div className="flex flex-col">
              <span className="text-foreground">EaseExpense</span>
              <span className="text-[11px] text-secondary_text">Full-stack budget tracker built during NST Internship</span>
            </div>
          </CommandItem>

          <CommandItem onSelect={() => handleSelect("/projects")} className="cursor-pointer gap-2.5">
            <FolderGit2 size={16} className="text-secondary_text" />
            <div className="flex flex-col">
              <span className="text-foreground">IoT Machine Failure Predictor</span>
              <span className="text-[11px] text-secondary_text">Hardware-to-ML predictive maintenance engine</span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
