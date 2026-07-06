import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";
import "./CertificateCard.css";

interface Certificate {
  id?: number | string;
  name: string;
  description: string;
  highlights?: string[];
  issuer: string;
  issued_date: string;
  pdf_url?: string;
}

interface CertificatesSectionProps {
  lightMode: boolean;
}

const CertificateIllustration = ({ title, issuer, gradientClass }: { title: string; issuer: string; gradientClass: string }) => {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex flex-col justify-between p-5 relative select-none`}>
      {/* Decorative inner frame */}
      <div className="absolute inset-2.5 border border-white/15 rounded-lg pointer-events-none"></div>

      {/* Top Header */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[7px] font-mono text-white/50 tracking-widest uppercase">VERIFIED CREDENTIAL</span>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
      </div>

      {/* Center Doc Lines & Title */}
      <div className="space-y-2 text-center z-10 flex-1 flex flex-col justify-center items-center">
        <h4 className="text-xs font-serif font-bold text-white/95 leading-tight px-3 line-clamp-3">
          {title}
        </h4>
        <p className="text-[8px] font-mono text-white/75 font-medium tracking-wide">
          {issuer}
        </p>
        
        {/* Decorative divider lines */}
        <div className="flex justify-center gap-1.5 pt-0.5 opacity-60">
          <div className="w-6 h-[1.5px] bg-white/35 rounded-full"></div>
          <div className="w-3 h-[1.5px] bg-white/35 rounded-full"></div>
        </div>
      </div>

      {/* Bottom stamp */}
      <div className="flex justify-between items-end z-10">
        <span className="text-[6px] font-mono text-white/40 tracking-wider">HARIOM ACHARYA</span>
        
        {/* Golden Medal Stamp */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400 drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)]" fill="currentColor">
          <path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="currentColor" opacity="0.95" />
          <path d="M9 18v3l3-2 3 2v-3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

const CertificateStamp = () => {
  return (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-900/20 flex flex-col items-center justify-center p-1 border-2 border-amber-400/60 relative select-none">
      {/* Decorative inner ring */}
      <div className="absolute inset-0.5 border border-dashed border-amber-500/30 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none"></div>
      
      {/* Icon Medal */}
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" fill="currentColor">
        <path d="M12 2a5 5 0 0 0-5 5c0 1.95 1.11 3.63 2.74 4.45L8 20l4-2 4 2-1.74-8.55C15.89 10.63 17 8.95 17 7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3c0 1.25-.76 2.3-1.85 2.75l.85 4.25-2-1-2 1 .85-4.25A3.003 3.003 0 0 1 9 7a3 3 0 0 1 3-3zm0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
      </svg>
      
      {/* Muted verified text */}
      <span className="text-[6px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mt-0.5">VERIFIED</span>
    </div>
  );
};

export default function CertificatesSection({ lightMode }: CertificatesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*"); // ✅ FIX: removed order (was causing issue)

      if (data && data.length > 0) {
        setCertificates(data);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        
        <ScrollFloat
          containerClassName="mb-16 text-center"
          textClassName="text-4xl md:text-5xl font-bold text-foreground"
          stagger={0.04}
        >
          Certificates
        </ScrollFloat>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto carbon-card overflow-hidden"
        >
          {/* window header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              certificates.tsx
            </span>
          </div>

          {/* content */}
          <div className="p-4 md:p-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {certificates.map((cert, i) => {
                const gradients = [
                  "from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa]", // Classic Blue
                  "from-[#064e3b] via-[#10b981] to-[#34d399]", // Emerald/Teal
                  "from-[#581c87] via-[#8b5cf6] to-[#a78bfa]", // Purple
                  "from-[#7c2d12] via-[#ea580c] to-[#f97316]", // Warm Orange/Bronze
                ];
                const grad = gradients[i % gradients.length];

                return (
                  <motion.div
                    key={cert.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08 }}
                    className="cert-card-wrapper"
                  >
                    <div className="cert-uiverse-card">
                      {/* Dynamic Certificate Illustration as Profile Pic */}
                      <div className="cert-pic">
                        {/* 1. Full view document illustration */}
                        <div className="cert-pic-full">
                          <CertificateIllustration
                            title={cert.name}
                            issuer={cert.issuer}
                            gradientClass={grad}
                          />
                        </div>
                        
                        {/* 2. Smaller round stamp seal (faded in on hover) */}
                        <div className="cert-pic-thumb">
                          <CertificateStamp />
                        </div>
                      </div>

                      {/* Slider details */}
                      <div className="cert-bottom-slider">
                        <div className="cert-bottom-content">
                          <span className="cert-name">{cert.name}</span>
                          <span className="cert-description">
                            {cert.description}
                            {cert.highlights && (
                              <ul className="list-disc pl-4 mt-2 space-y-0.5 text-[9px]" style={{ color: 'var(--cert-subtext)' }}>
                                {cert.highlights.map((h, idx) => (
                                  <li key={idx}>{h}</li>
                                ))}
                              </ul>
                            )}
                          </span>
                        </div>

                        <div className="cert-slider-footer">
                          <div className="cert-badge-info">
                            {/* Verified check badge */}
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400">
                              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20" />
                              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" />
                            </svg>
                            <span>{cert.issued_date}</span>
                          </div>

                          {cert.pdf_url && (
                            <button
                              onClick={() => window.open(cert.pdf_url, '_blank')}
                              className="Documents-btn"
                            >
                              <span className="folderContainer">
                                <svg
                                  className="fileBack"
                                  width="146"
                                  height="113"
                                  viewBox="0 0 146 113"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                                    fill={`url(#paint0_linear_117_4_${i})`}
                                  ></path>
                                  <defs>
                                    <linearGradient
                                      id={`paint0_linear_117_4_${i}`}
                                      x1="0"
                                      y1="0"
                                      x2="72.93"
                                      y2="95.4804"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#8F88C2"></stop>
                                      <stop offset="1" stopColor="#5C52A2"></stop>
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <svg
                                  className="filePage"
                                  width="88"
                                  height="99"
                                  viewBox="0 0 88 99"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect width="88" height="99" fill={`url(#paint0_linear_117_6_${i})`}></rect>
                                  <defs>
                                    <linearGradient
                                      id={`paint0_linear_117_6_${i}`}
                                      x1="0"
                                      y1="0"
                                      x2="81"
                                      y2="160.5"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="white"></stop>
                                      <stop offset="1" stopColor="#686868"></stop>
                                    </linearGradient>
                                  </defs>
                                </svg>

                                <svg
                                  className="fileFront"
                                  width="160"
                                  height="79"
                                  viewBox="0 0 160 79"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                                    fill={`url(#paint0_linear_117_5_${i})`}
                                  ></path>
                                  <defs>
                                    <linearGradient
                                      id={`paint0_linear_117_5_${i}`}
                                      x1="38.7619"
                                      y1="8.71323"
                                      x2="66.9106"
                                      y2="82.8317"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#C3BBFF"></stop>
                                      <stop offset="1" stopColor="#51469A"></stop>
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </span>
                              <p className="text">View Certificate</p>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}