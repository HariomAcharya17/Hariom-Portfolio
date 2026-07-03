import './SocialMediaGrid.css';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function SocialMediaGrid() {
  return (
    <div className="social-main">
      <div className="social-main_back"></div>
      
      <a href="https://github.com/HariomAcharya17" target="_blank" rel="noopener noreferrer" className="social-card github">
        <Github className="social-icon" />
      </a>
      
      <a href="https://www.linkedin.com/in/hariom-a-218649318/" target="_blank" rel="noopener noreferrer" className="social-card linkedin">
        <Linkedin className="social-icon" />
      </a>
      
      <a href="mailto:hariomstudy1700@gmail.com" className="social-card gmail">
        <Mail className="social-icon" />
      </a>

      <div className="social-text">SOCIALS</div>
    </div>
  );
}
