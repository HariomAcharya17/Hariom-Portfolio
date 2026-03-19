import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [showSuccess,setShowSuccess] = useState(false);

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("contact_form")
      .insert([form]);

    if (error) {
      console.error(error);
      return;
    }

    // 🔥 Show Apple success animation
    setShowSuccess(true);
    setTimeout(()=>setShowSuccess(false),2500);

    setForm({ name: "", email: "", message: "" });
  };

  /* ================= CHAT TYPING ================= */

  const messages = [
    "Hello 👋, welcome to my portfolio",
    "Hope you’re having a great day!",
    "Did something here catch your interest?",
    "I love building scalable and impactful solutions ❤️",
    "Always open to exciting opportunities and collaborations",
    "Let’s connect and create something meaningful together ✨",
    "Feel free to drop a message anytime 😊"
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {

    const current = messages[messageIndex];
    let i = 0;

    const typingInterval = setInterval(() => {

      setDisplayedText(current.slice(0, i + 1));
      i++;

      if (i === current.length) {

        clearInterval(typingInterval);
        setTyping(false);

        setTimeout(() => {
          setTyping(true);
          setDisplayedText("");
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2500);

      }

    }, 40);

    return () => clearInterval(typingInterval);

  }, [messageIndex]);

  return (

    <>
    {/* 🔥 APPLE SUCCESS NOTIFICATION */}
    <AnimatePresence>
      {showSuccess && (

        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 30, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type:"spring", stiffness:180, damping:18 }}
          className="fixed top-0 left-0 w-full flex justify-center z-[9999] pointer-events-none"
        >

          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-xl backdrop-blur-xl border ${
              lightMode
                ? "bg-white/90 border-gray-200"
                : "bg-black/80 border-white/10"
            }`}
          >

            {/* ✅ Animated Tick */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>

            <span className={`${lightMode ? "text-black" : "text-white"} font-medium`}>
              Message Sent
            </span>

          </div>

        </motion.div>

      )}
    </AnimatePresence>


    <section id="contact" className="py-28 relative overflow-hidden">

      {!lightMode && (
        <div className="absolute pointer-events-none bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-500/20 blur-[180px]" />
      )}

      <div className="container mx-auto px-6" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Let's <span className="text-purple-400">Chat</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`max-w-4xl mx-auto rounded-xl border shadow-2xl overflow-hidden ${
            lightMode
              ? "bg-white border-gray-200"
              : "bg-[#0d1117] border-[#30363d]"
          }`}
        >

          {/* Header */}
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${
            lightMode
              ? "bg-gray-100 border-gray-200"
              : "bg-[#161b22] border-[#30363d]"
          }`}>
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-sm text-gray-400 font-mono">
              messages.app
            </span>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">

            {/* AI message */}
            <div className="flex">
              <div className={`px-4 py-3 rounded-2xl max-w-xs font-mono ${
                lightMode
                  ? "bg-gray-100 border border-gray-200 text-gray-700"
                  : "bg-[#161b22] border border-[#30363d] text-gray-300"
              }`}>
                {displayedText}
                {typing && <span className="ml-1 animate-pulse text-purple-400">|</span>}
              </div>
            </div>

            {/* Reply */}
            <div className="flex justify-end">
              <div className="bg-purple-500 text-white px-4 py-3 rounded-2xl max-w-xs">
                I'd love to collaborate with you.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-6">

              <div className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                lightMode ? "bg-gray-100 border border-gray-200" : "bg-[#161b22] border border-[#30363d]"
              }`}>
                <User size={16} className="text-purple-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e)=>setForm(prev=>({...prev,name:e.target.value}))}
                  placeholder="Your name"
                  className="bg-transparent outline-none w-full"
                />
              </div>

              <div className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                lightMode ? "bg-gray-100 border border-gray-200" : "bg-[#161b22] border border-[#30363d]"
              }`}>
                <Mail size={16} className="text-purple-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e)=>setForm(prev=>({...prev,email:e.target.value}))}
                  placeholder="your@email.com"
                  className="bg-transparent outline-none w-full"
                />
              </div>

              <div className={`flex items-start gap-3 rounded-lg px-4 py-3 ${
                lightMode ? "bg-gray-100 border border-gray-200" : "bg-[#161b22] border border-[#30363d]"
              }`}>
                <MessageSquare size={16} className="text-purple-400 mt-1" />
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e)=>setForm(prev=>({...prev,message:e.target.value}))}
                  placeholder="Your message..."
                  className="bg-transparent outline-none w-full resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
              >
                <Send size={18}/> Send Message
              </button>

            </form>

          </div>

        </motion.div>

      </div>

    </section>
    </>
  );
}