import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Download, FolderOpen } from "lucide-react";
import developerAvatar from "@/assets/developer-avatar.png";
import developerAvatarLight from "@/assets/developer-avatar-light.png";

const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Cloud Engineer"];

export default function HeroSection({ lightMode }: any) {

const [roleIdx, setRoleIdx] = useState(0);
const [text, setText] = useState("");
const [deleting, setDeleting] = useState(false);

/* particles */

const [particles] = useState(() =>
Array.from({ length: 170 }).map(() => ({
center: `${10 + Math.random() * 100}%`,
duration: `${20 + Math.random() * 60}s`,
delay: `${Math.random() * 10}s`
}))
);

useEffect(() => {

const current = roles[roleIdx];
let timeout: ReturnType<typeof setTimeout>;

if (!deleting) {

if (text.length < current.length) {
timeout = setTimeout(() => {
setText(current.slice(0, text.length + 1));
}, 80);
} else {
timeout = setTimeout(() => setDeleting(true), 2000);
}

} else {

if (text.length > 0) {
timeout = setTimeout(() => {
setText(text.slice(0, -1));
}, 40);
} else {
setDeleting(false);
setRoleIdx((prev) => (prev + 1) % roles.length);
}

}

return () => clearTimeout(timeout);

}, [text, deleting, roleIdx]);

return (

<section
className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out
${
lightMode
? "bg-[radial-gradient(circle_at_50%_90%,rgba(124,58,237,0.25),transparent_60%),linear-gradient(180deg,#faf8ff,#efe9ff,#f3f0ff)]"
: "bg-[radial-gradient(circle_at_50%_100%,rgba(140,90,255,0.35),transparent_55%),linear-gradient(180deg,#0b0f2a,#1a1145,#0b0f2a)]"
}
`}
>

{/* Glow */}

<div
className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] blur-[180px]
${lightMode ? "bg-purple-300/30" : "bg-purple-500/30"}
`}
/>

<div className="container mx-auto px-6 relative z-10">

<div className="grid md:grid-cols-2 gap-10 items-center">

{/* LEFT SIDE */}

<motion.div
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
className="max-w-xl"
>

<p className="text-purple-300 font-mono text-sm mb-4">
&lt;Hello World /&gt;
</p>

<h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-4 ${
lightMode ? "text-gray-900" : "text-white"
}`}>
I'm <span className="text-purple-400">Hariom</span>
<br />
Acharya
</h1>

<div className="h-8 mb-6">
<span className="font-mono text-lg text-purple-400">
{text}
<span className="animate-pulse">|</span>
</span>
</div>

<p className={`max-w-md mb-8 leading-relaxed ${
lightMode ? "text-gray-700" : "text-gray-300"
}`}>

I'm a <span className="text-purple-400 font-semibold">
B.Tech pre-final year student
</span> at LDRP-ITR with a{" "}
<span className="text-purple-400 font-semibold">
CGPA of 8.52
</span>.

<br /><br />

I work with <span className="text-purple-400 font-semibold">
AI/ML, IoT, and the MERN stack
</span> focusing on scalable solutions.

<br /><br />

My interests include <span className="text-purple-400 font-semibold">
web development, cloud computing, and intelligent systems
</span> solving real-world problems.

</p>

<div className="flex flex-wrap gap-4">

<a
href="#projects"
className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition"
>
<FolderOpen size={18}/> View Projects
</a>

<a
href="/resume.pdf"
download
className={`inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium border transition ${
lightMode
? "border-purple-300 text-purple-700 hover:bg-purple-100"
: "border-purple-400/40 text-purple-200 hover:bg-purple-500/10"
}`}
>
<Download size={18}/> Download Resume
</a>

</div>

</motion.div>

{/* RIGHT SIDE */}

<div className="flex justify-center items-center relative">

<motion.img
src={lightMode ? developerAvatarLight : developerAvatar}
alt="Hariom Acharya"
className="relative z-20 w-[500px] md:w-[650px] object-contain"
animate={{ y: [0, -20, 0] }}
transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
/>

{/* particles */}

<div className="avatar-particles absolute z-0">

{particles.map((p,i)=>(
<span
key={i}
className="spark"
style={{
left: p.center,
bottom: "18%",
animationDuration: p.duration,
animationDelay: p.delay
}}
/>
))}

</div>

</div>

</div>

</div>

{/* Scroll */}

<motion.div
className="absolute left-1/2 -bottom-6 -translate-x-1/2"
animate={{ y: [0, 12, 0] }}
transition={{ duration: 2, repeat: Infinity }}
>
<ArrowDown className="text-purple-400 opacity-70" size={28}/>
</motion.div>

</section>

);

}