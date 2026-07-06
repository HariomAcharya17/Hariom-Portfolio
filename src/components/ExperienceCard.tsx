import React, { useState } from 'react';
import { LucideIcon, X, Info } from 'lucide-react';
import './ExperienceCard.css';

interface ExperienceCardProps {
  icon: LucideIcon;
  role: string;
  org: string;
  year: number | string;
  desc: string;
  details: string[];
  gradientClass: string;
  index: number;
}

export default function ExperienceCard({
  icon: Icon,
  role,
  org,
  year,
  desc,
  details,
  gradientClass,
  index,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleSidebarClick = (e: React.MouseEvent) => {
    if (isOpen) {
      e.stopPropagation();
      setIsOpen(false);
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`exp-card-wrap ${isOpen ? 'is-open' : ''}`}
    >
      {/* Sliding Overlay containing Sidebar and Main Cover */}
      <div className="exp-card-overlay">
        
        {/* Left Sidebar - Tab when open */}
        <div 
          onClick={handleSidebarClick}
          className="exp-card-sidebar"
        >
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center exp-animate exp-pop exp-delay-1">
            <Icon className="text-primary" size={20} />
          </div>
          
          <div className="exp-card-vertical-title exp-animate exp-slide-left exp-delay-3">
            {org}
          </div>
          
          <div className="exp-card-dots exp-animate exp-slide-up exp-delay-5">
            <div className="exp-card-dot animate-pulse" />
            <div className="exp-card-dot animate-pulse" style={{ animationDelay: '0.15s' }} />
            <div className="exp-card-dot animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>

        {/* Right Content Area of Overlay (Gradient cover) */}
        <div className={`exp-card-image bg-gradient-to-br ${gradientClass}`}>
          {/* Top Pill / Year */}
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-slate-200/80 text-slate-700 border border-slate-300/20 dark:bg-black/30 dark:text-slate-300 dark:border-transparent px-2.5 py-1 rounded-full backdrop-blur-md exp-animate exp-slide exp-delay-2">
              {year}
            </span>
          </div>

          {/* Bottom Role & Description */}
          <div className="space-y-2 relative z-10 text-left">
            <h4 className="text-xs text-primary font-mono font-semibold uppercase tracking-wider exp-animate exp-slide-left exp-delay-3">
              {org}
            </h4>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight exp-animate exp-slide-left exp-delay-4">
              {role}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2 max-w-[95%] exp-animate exp-slide-left exp-delay-5">
              {desc}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1.5 exp-animate exp-slide-up exp-delay-6">
              <Info size={12} className="text-slate-500 dark:text-slate-400" />
              <span>Click to view details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Container - Revealed when overlay slides left */}
      <div 
        className="exp-card-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-border pb-2 mb-3">
          <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-primary">
            role_accomplishments.md
          </span>
          <button 
            onClick={handleCloseClick}
            className="w-6 h-6 rounded-full flex items-center justify-center text-secondary_text hover:bg-layer hover:text-foreground transition-colors"
            title="Close panel"
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="space-y-3 pr-1 text-left">
          <h3 className="text-sm font-bold text-foreground tracking-tight border-l-2 border-primary pl-2 leading-snug">
            {role}
          </h3>
          <p className="text-[11px] font-mono text-secondary_text">
            {org} • {year}
          </p>
          <ul className="space-y-2 mt-2 pt-2 border-t border-border/30">
            {details.map((bullet, i) => (
              <li 
                key={i} 
                className="text-xs leading-relaxed text-secondary_text font-normal flex items-start gap-2"
              >
                <span className="text-primary mt-0.5 select-none shrink-0">•</span>
                <span dangerouslySetInnerHTML={{ __html: bullet }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
