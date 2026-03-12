import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          © 2024 Hariom Acharya. All rights reserved.
        </span>
        <div className="flex gap-4">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
