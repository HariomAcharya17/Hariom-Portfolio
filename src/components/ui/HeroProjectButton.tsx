import './HeroProjectButton.css';
import { FolderOpen } from 'lucide-react';

export default function HeroProjectButton({ href, children }: any) {
  return (
    <a href={href} className="hero-project-btn">
      <FolderOpen size={18} className="mr-2" /> {children}
    </a>
  );
}
