import './LiveDemoButton.css';
import { Globe, ExternalLink } from 'lucide-react';

interface LiveDemoButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function LiveDemoButton({ href, children }: LiveDemoButtonProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <button className="live-demo-btn-sergestra">
        <div>
          <span>
            <p className="btn-text">{children}</p>
            <Globe size={16} className="text-white" />
          </span>
        </div>
        <div>
          <span>
            <p className="btn-text">Visit Site</p>
            <ExternalLink size={16} className="text-white" />
          </span>
        </div>
      </button>
    </a>
  );
}
