import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";
import ViewCertificateButton from "@/components/ui/ViewCertificateButton";

export default function CertificatesSection({ lightMode }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [certificates, setCertificates] = useState<any[]>([]);

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
          <div className="p-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="carbon-card p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {cert.name}
                    </h3>

                    <p className="text-xs mb-3 leading-relaxed text-secondary_text">
                      {cert.description}
                    </p>

                    {cert.highlights && (
                      <ul className="list-disc pl-5 mb-4 space-y-1 text-xs leading-relaxed text-secondary_text">
                        {cert.highlights.map((h: string, idx: number) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    )}

                    <p className="text-xs text-blue-500 mb-5 font-mono">
                      {cert.issuer} • {cert.issued_date}
                    </p>
                  </div>

                  <div>
                    {cert.pdf_url && (
                      <ViewCertificateButton href={cert.pdf_url}>
                        View Certificate
                      </ViewCertificateButton>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}