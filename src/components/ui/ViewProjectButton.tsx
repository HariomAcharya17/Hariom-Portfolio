import './ViewProjectButton.css';
import { FileCode2 } from 'lucide-react';

export default function ViewProjectButton({ href, children }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <button className="view-project-btn">
        <div className="btn-slider">
          <span className="btn-content primary">{children}</span>
          <span className="btn-content secondary">
            <FileCode2 size={18} />
          </span>
        </div>
      </button>
    </a>
  );
}
