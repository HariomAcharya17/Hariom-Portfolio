import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  /* ================= CHAT TYPING ================= */

  const messages = [
    "Hello 👋",
    "Did you like my portfolio??",
    "What are you building these days?",
    "Maybe we can collaborate on something interesting 🚀",
    "Mail me,I would Love❤️ to catch up😉"
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

    <section id="contact" className="py-28 relative overflow-hidden">

      {/* glow only in dark mode */}
      {!lightMode && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-500/20 blur-[180px]" />
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

        {/* Mac window */}
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

          {/* window header */}
          <div
            className={`flex items-center gap-2 px-4 py-3 border-b ${
              lightMode
                ? "bg-gray-100 border-gray-200"
                : "bg-[#161b22] border-[#30363d]"
            }`}
          >

            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="ml-4 text-sm text-gray-400 font-mono">
              messages.app
            </span>

          </div>

          {/* chat area */}
          <div className="p-8 space-y-6">

            {/* AI message */}
            <motion.div
              className="flex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >

              <div
                className={`px-4 py-3 rounded-2xl max-w-xs font-mono ${
                  lightMode
                    ? "bg-gray-100 border border-gray-200 text-gray-700"
                    : "bg-[#161b22] border border-[#30363d] text-gray-300"
                }`}
              >

                {displayedText}

                {typing && (
                  <span className="ml-1 animate-pulse text-purple-400">|</span>
                )}

              </div>

            </motion.div>

            {/* your reply */}
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >

              <div className="bg-purple-500 text-white px-4 py-3 rounded-2xl max-w-xs">
                I'd love to collaborate with you.
              </div>

            </motion.div>

            {/* typing dots */}
            {typing && (
              <div className="flex gap-1 ml-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"/>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"/>
              </div>
            )}

            {/* form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-6">

              {/* name */}
              <div
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                  lightMode
                    ? "bg-gray-100 border border-gray-200"
                    : "bg-[#161b22] border border-[#30363d]"
                }`}
              >
                <User size={16} className="text-purple-400" />

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={`bg-transparent outline-none w-full ${
                    lightMode ? "text-gray-800" : "text-gray-200"
                  }`}
                />

              </div>

              {/* email */}
              <div
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                  lightMode
                    ? "bg-gray-100 border border-gray-200"
                    : "bg-[#161b22] border border-[#30363d]"
                }`}
              >

                <Mail size={16} className="text-purple-400" />

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`bg-transparent outline-none w-full ${
                    lightMode ? "text-gray-800" : "text-gray-200"
                  }`}
                />

              </div>

              {/* message */}
              <div
                className={`flex items-start gap-3 rounded-lg px-4 py-3 ${
                  lightMode
                    ? "bg-gray-100 border border-gray-200"
                    : "bg-[#161b22] border border-[#30363d]"
                }`}
              >

                <MessageSquare size={16} className="text-purple-400 mt-1" />

                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Your message..."
                  className={`bg-transparent outline-none w-full resize-none ${
                    lightMode ? "text-gray-800" : "text-gray-200"
                  }`}
                />

              </div>

              {/* submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition"
              >

                <Send size={18}/> Send Message

              </motion.button>

            </form>

          </div>

        </motion.div>

      </div>

    </section>

  );
}