import './ViewCertificateButton.css';
import { FileBadge } from 'lucide-react';

export default function ViewCertificateButton({ href, children }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="view-cert-button">
      <span className="text">{children}</span>
      <div className="svg">
        <FileBadge />
      </div>
    </a>
  );
}
