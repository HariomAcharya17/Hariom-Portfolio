import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ScrollFloat from "@/components/ui/ScrollFloat";

export default function ContactSection({ lightMode }: any) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [showSuccess,setShowSuccess] = useState(false);

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict Email Validation to ensure real domains
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address so I can reply back to you!");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: "66dc5cd9-d946-4a62-a272-4e0242a25b9f",
            name: form.name,
            email: form.email,
            message: form.message,
            subject: "New Portfolio Message from " + form.name,
            from_name: "Portfolio Contact Form"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again later.");
      return;
    }

    // 🔥 Show Apple success animation
    setShowSuccess(true);
    setTimeout(()=>setShowSuccess(false),2500);

    setForm({ name: "", email: "", message: "" });
  };



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

            <span className={`${lightMode ? "text-black" : "text-blue-500"} font-medium`}>
              Message Sent
            </span>

          </div>

        </motion.div>

      )}
    </AnimatePresence>


    <section id="contact" className="py-28 relative overflow-hidden">

      <div className="container mx-auto px-6" ref={ref}>

        <ScrollFloat
          containerClassName="mb-16 text-center"
          textClassName="text-4xl md:text-5xl font-bold text-foreground"
          stagger={0.04}
        >
          Let's Chat
        </ScrollFloat>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto carbon-card overflow-hidden"
        >

          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-layer">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-primary">
              messages.app
            </span>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              {/* Left Column: Form */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary_text">
                  Send Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-input carbon-focus focus-within:border-primary transition-colors">
                    <User size={16} className="text-primary" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e)=>setForm(prev=>({...prev,name:e.target.value}))}
                      placeholder="Your name"
                      className="bg-transparent outline-none w-full text-sm text-foreground"
                    />
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-input carbon-focus focus-within:border-primary transition-colors">
                    <Mail size={16} className="text-primary" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e)=>setForm(prev=>({...prev,email:e.target.value}))}
                      placeholder="your@email.com"
                      className="bg-transparent outline-none w-full text-sm text-foreground"
                    />
                  </div>

                  <div className="flex items-start gap-3 px-4 py-3 border-b border-border bg-input carbon-focus focus-within:border-primary transition-colors">
                    <MessageSquare size={16} className="text-primary mt-1" />
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e)=>setForm(prev=>({...prev,message:e.target.value}))}
                      placeholder="Your message..."
                      className="bg-transparent outline-none w-full resize-none text-sm text-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full carbon-btn-primary justify-center"
                  >
                    <Send size={16}/> Send Message
                  </button>
                </form>
              </div>

              {/* Right Column: AI status & Contact details */}
              <div className="space-y-6 md:pl-4">
                


                {/* Direct info coordinates */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    Direct Coordinates
                  </h3>

                  <div className="space-y-3 text-xs leading-relaxed">


                    <div className="flex flex-col">
                      <span className="text-gray-400">Email Address</span>
                      <a href="mailto:hariomstudy1700@gmail.com" className="text-blue-500 font-medium hover:underline text-sm mt-0.5">
                        hariomstudy1700@gmail.com
                      </a>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-400">Current Location</span>
                      <span className="font-medium mt-0.5 text-foreground">
                        Gandhinagar, Gujarat, India
                      </span>
                    </div>

                    <div className="flex flex-col items-start">
                      <span className="text-gray-400 mb-1">Internship Status</span>
                      <span className="px-2.5 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 font-medium">
                        Open for Roles & Projects
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </motion.div>

      </div>

    </section>
    </>
  );
}