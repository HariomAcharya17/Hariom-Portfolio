import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CertificatesSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {

    const fetchCertificates = async () => {

      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("issued_date", { ascending: false });

      if (error) {
        console.error("Certificates fetch error:", error);
      }

      if (data) {
        setCertificates(data);
      }

    };

    fetchCertificates();

  }, []);

  return (

<section id="certificates" className="py-28 relative overflow-hidden">

{/* purple spotlight */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-500/20 blur-[180px]" />

<div className="container mx-auto px-6" ref={ref}>

<motion.h2
initial={{ opacity: 0, y: 20 }}
animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.5 }}
className="text-4xl md:text-5xl font-bold text-center mb-16"
>
Certificates
</motion.h2>

{/* Mac Window */}

<motion.div
initial={{ opacity: 0, y: 30 }}
animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.6 }}
className={`max-w-6xl mx-auto rounded-xl border shadow-2xl overflow-hidden
${lightMode
? "bg-white border-gray-200"
: "bg-[#0d1117] border-[#30363d]"
}
`}
>

{/* window header */}

<div className={`flex items-center gap-2 px-4 py-3 border-b
${lightMode
? "bg-gray-100 border-gray-200"
: "bg-[#161b22] border-[#30363d]"
}
`}>

<div className="w-3 h-3 rounded-full bg-red-500" />
<div className="w-3 h-3 rounded-full bg-yellow-500" />
<div className="w-3 h-3 rounded-full bg-green-500" />

<span className="ml-4 text-sm text-gray-400 font-mono">
certificates.tsx
</span>

</div>

{/* content */}

<div className="p-10">

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{certificates.map((cert, i) => (

<motion.div
key={cert.id}
initial={{ opacity: 0, y: 20 }}
animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ delay: i * 0.1 }}
className={`rounded-lg border p-6 transition-all
${lightMode
? "bg-white border-gray-200 hover:bg-gray-50"
: "bg-[#161b22] border-[#30363d] hover:bg-[#1c2128]"
}
`}
>

<h3 className={`text-lg font-semibold mb-2
${lightMode ? "text-gray-900" : "text-white"}
`}>
{cert.name}
</h3>

<p className={`text-sm mb-4
${lightMode ? "text-gray-600" : "text-gray-400"}
`}>
{cert.description}
</p>

<p className="text-xs text-purple-400 mb-4 font-mono">
{cert.issuer} • {cert.issued_date}
</p>

<a
href={cert.pdf_url}
target="_blank"
className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
>

<FileText size={16}/>
View Certificate

</a>

</motion.div>

))}

</div>

</div>

</motion.div>

</div>

</section>

  );

}