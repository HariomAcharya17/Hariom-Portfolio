import { motion } from "framer-motion";

export default function AppleNotification({ name, rating, message }) {

  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      exit={{ y: -120, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[350px] z-50"
    >

      <div className="bg-[#1c1c1e]/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/10">

        <p className="text-xs text-gray-400 mb-1 font-semibold">
          MESSAGES
        </p>

        <p className="text-sm text-gray-300 mb-2">
          Hariom Portfolio
        </p>

        <p className="text-white text-sm font-semibold">
          {name} ⭐{rating}
        </p>

        <p className="text-gray-300 text-sm">
          {message}
        </p>

      </div>

    </motion.div>
  );

}