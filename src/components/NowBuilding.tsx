import { motion } from "framer-motion";
import { useState } from "react";

export default function NowBuilding({ lightMode }: any) {

  const [active, setActive] = useState<number | null>(null);

  const items = [
    {
      title: "DevOps CI/CD Dashboard",
      desc: "Automating deployments using pipelines and cloud integration."
    },
    {
      title: "AI Resume Analyzer",
      desc: "Analyzing resumes using NLP and ML models."
    },
    {
      title: "Cloud File Storage",
      desc: "Scalable file system using AWS services."
    }
  ];

  const handleClick = (i: number) => {
    setActive(prev => (prev === i ? null : i));
  };

  return (
    <section className="py-32 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center">

        {/* Dynamic Island */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={`mb-20 px-6 md:px-10 py-4 rounded-full shadow-xl backdrop-blur-md flex items-center gap-4 md:gap-6 ${
            lightMode
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >

          {/* TEXT */}
          <div className="text-center">
            <motion.div layout className="text-lg md:text-2xl font-semibold">
              {active === null
                ? "Currently Building"
                : items[active].title}
            </motion.div>

            {active !== null && (
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs opacity-70"
              >
                {items[active].desc}
              </motion.p>
            )}
          </div>

          {/* 🔥 APPLE VOICE WAVE */}
          {active !== null && (
            <div className="flex items-end gap-[4px] h-8">

              {[
                "#ff3b30", // red
                "#ff9f0a", // orange
                "#ffd60a", // yellow
                "#34c759", // green
                "#30d158"  // light green
              ].map((color, i) => (

                <motion.div
                  key={i}
                  animate={{
                    height: [8, 26, 14, 30, 10],
                    opacity: [0.6, 1, 0.8, 1, 0.6]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut"
                  }}
                  className="w-[4px] rounded-full"
                  style={{
                    background: color,
                    boxShadow: `0 0 8px ${color}`
                  }}
                />

              ))}

            </div>
          )}

        </motion.div>

        {/* Cards */}
        <div className="max-w-3xl w-full space-y-8 md:space-y-10">

          {items.map((item, i) => (

            <motion.div
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => handleClick(i)}

              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}

              transition={{ type: "spring", stiffness: 200, damping: 18 }}

              className={`flex items-center justify-between px-5 md:px-6 py-4 md:py-5 rounded-full border cursor-pointer ${
                lightMode
                  ? "bg-gray-100 border-gray-200"
                  : "bg-[#161b22] border-[#30363d]"
              }`}
            >

              <span className="text-sm md:text-lg">
                {item.title}
              </span>

              <span className="w-3 h-3 bg-green-500 rounded-full" />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}