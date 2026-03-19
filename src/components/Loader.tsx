import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  "Hola",
  "Bonjour",
   "Hallo",
  "Ciao",
  "こんにちは",
  "Welcome 🙏🏻",
  "नमस्ते",

  ]

export default function Loader({ onFinish }: any) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    texts.forEach((_, i) => {
      const t = setTimeout(() => {
        setIndex(i);
      }, i * 1400); // ✅ PERFECT SPEED (not fast, not slow)

      timeouts.push(t);
    });

    // ✅ finish loader AFTER all texts
    const totalDuration = texts.length * 1500 + 1000;

    const finishTimer = setTimeout(() => {
      onFinish(); // 🔥 tells App to load main UI
    }, totalDuration);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0f2a] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Glow Background */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[140px]"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Text Animation */}
      <div className="relative z-10 text-center">

        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            className="text-3xl md:text-5xl font-semibold text-purple-400 tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // smoother
          >
            {texts[index]}
          </motion.h1>
        </AnimatePresence>

        {/* Underline glow */}
        <motion.div
          className="mt-6 h-[3px] w-32 mx-auto bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

      </div>
    </motion.div>
  );
}