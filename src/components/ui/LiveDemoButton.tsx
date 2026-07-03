import './LiveDemoButton.css';
import { ExternalLink } from 'lucide-react';

export default function LiveDemoButton({ href, children }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="live-demo-button">
      <ExternalLink size={14} className="mr-2" />
      {children}
    </a>
  );
}
