import { motion } from "framer-motion";

const shapes = [
  { size: 60, top: "10%", left: "5%", delay: 0, color: "var(--neon-purple)", shape: "circle" },
  { size: 40, top: "20%", right: "10%", delay: 1, color: "var(--neon-cyan)", shape: "square" },
  { size: 50, top: "60%", left: "8%", delay: 2, color: "var(--neon-pink)", shape: "triangle" },
  { size: 35, top: "70%", right: "5%", delay: 0.5, color: "var(--neon-purple)", shape: "circle" },
  { size: 45, top: "40%", right: "15%", delay: 1.5, color: "var(--neon-cyan)", shape: "square" },
  { size: 30, top: "85%", left: "15%", delay: 2.5, color: "var(--neon-pink)", shape: "circle" },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            right: s.right,
            borderRadius: s.shape === "circle" ? "50%" : s.shape === "square" ? "8px" : "0",
            background: `hsl(${s.color})`,
            clipPath: s.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
