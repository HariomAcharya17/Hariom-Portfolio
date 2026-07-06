import React, { useState } from 'react';
import { LucideIcon, X, Info } from 'lucide-react';
import './CapabilityCard.css';

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  sidebarLabel: string;
  desc: string;
  details: string[];
  gradientClass: string;
  badgeText: string;
  index: number;
}

export default function CapabilityCard({
  icon: Icon,
  title,
  sidebarLabel,
  desc,
  details,
  gradientClass,
  badgeText,
  index,
}: CapabilityCardProps) {
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

  // We stagger the entry animations using index-based delays
  const animationDelayClass = `cap-delay-${(index % 8) + 1}`;

  return (
    <div
      onClick={handleCardClick}
      className={`cap-card-wrap ${isOpen ? 'is-open' : ''}`}
    >
      {/* Sliding Overlay containing Sidebar and Image Panel */}
      <div className="cap-card-overlay">
        
        {/* Left Sidebar - Always visible as a tab when open */}
        <div 
          onClick={handleSidebarClick}
          className="cap-card-sidebar"
        >
          <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center cap-animate cap-pop cap-delay-1">
            <Icon className="text-blue-500" size={20} />
          </div>
          
          <div className="cap-card-vertical-title cap-animate cap-slide-left cap-delay-3">
            {sidebarLabel}
          </div>
          
          <div className="cap-card-dots cap-animate cap-slide-up cap-delay-5">
            <div className="cap-card-dot animate-pulse" />
            <div className="cap-card-dot animate-pulse" style={{ animationDelay: '0.15s' }} />
            <div className="cap-card-dot animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>

        {/* Right Image/Gradient Panel - Slides left & shrinks when open */}
        <div className={`cap-card-image bg-gradient-to-br ${gradientClass}`}>
          {/* Top Badge */}
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-slate-200/80 text-slate-700 border border-slate-300/20 dark:bg-black/30 dark:text-slate-300 dark:border-transparent px-2.5 py-1 rounded-full backdrop-blur-md cap-animate cap-slide cap-delay-2">
              {badgeText}
            </span>
          </div>

          {/* Bottom Title & Instruction */}
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight cap-animate cap-slide-left cap-delay-4">
              {title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2 max-w-[90%] cap-animate cap-slide-left cap-delay-5">
              {desc}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1.5 cap-animate cap-slide-up cap-delay-6">
              <Info size={12} className="text-slate-500 dark:text-slate-400" />
              <span>Click to explore how I work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Container - Revealed when overlay slides left */}
      <div 
        className="cap-card-text"
        onClick={(e) => e.stopPropagation()} // Prevent card toggle when interacting with detail text
      >
        <div className="flex justify-between items-center border-b border-border pb-2 mb-3">
          <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-primary">
            capabilities_details.md
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
          <h3 className="text-sm font-bold text-foreground tracking-tight border-l-2 border-primary pl-2">
            Working with {title}
          </h3>
          {details.map((para, i) => (
            <p 
              key={i} 
              className="text-xs leading-relaxed text-secondary_text font-normal"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
