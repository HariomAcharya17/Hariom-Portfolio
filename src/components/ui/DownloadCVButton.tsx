import './DownloadCVButton.css';
import { Download } from 'lucide-react';

export default function DownloadCVButton({ href, children }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="download-cv-btn">
      {children}
      <Download size={16} className="ml-2" />
    </a>
  );
}
