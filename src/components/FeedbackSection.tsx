import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import CardSwap, { Card } from "@/components/ui/CardSwap";

const ACCENT_COLORS = [
  "#2563eb", // blue
  "#dc2626", // red
  "#16a34a", // green
  "#7c3aed", // purple
  "#b45309", // amber
];

const defaultFeedback = [
  { name: "Aarav Sharma",  message: "Incredible attention to detail in cloud systems! Highly recommended developer.", rating: 5 },
  { name: "Ananya Patel",  message: "The 3D portfolio design is absolutely mind-blowing. Great frontend engineering!", rating: 5 },
  { name: "Rohan Das",     message: "Delivered a super-fast API pipeline that cut search query latency significantly.", rating: 5 },
  { name: "Sneha Reddy",   message: "Excellent communication and flawless execution of every engineering milestone.", rating: 5 },
  { name: "Karan Mehta",   message: "The codebase is clean, well-documented, and a pleasure to collaborate on.", rating: 5 },
];

/** Minimal reviewer card — banner, avatar, name, stars, message only */
function ReviewCard({ fb, accent }: { fb: typeof defaultFeedback[0]; accent: string }) {
  const initials = fb.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="w-full h-full flex flex-col carbon-card overflow-hidden select-none">
      {/* Coloured banner */}
      <div className="relative flex-shrink-0 h-[90px]" style={{ background: accent }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-16 h-16 rounded-full border-[3px] border-layer flex items-center justify-center text-white font-bold text-xl shadow-md"
          style={{ background: accent, filter: "brightness(0.82)" }}
        >
          {initials}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center px-5 pt-11 pb-5 flex-1">
        {/* Name */}
        <p className="font-bold text-foreground text-base leading-tight text-center mt-1">{fb.name}</p>

        {/* Stars */}
        <div className="flex gap-0.5 mt-2.5">
          {[1,2,3,4,5].map(s => (
            <span key={s} className={`text-xl ${s <= fb.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
          ))}
        </div>

        {/* Message */}
        <p className="text-sm text-secondary_text text-center mt-3 leading-relaxed">
          "{fb.message}"
        </p>
      </div>
    </div>
  );
}

interface FeedbackItem {
  id?: number | string;
  name: string;
  message: string;
  rating: number;
  approved?: boolean;
  created_at?: string;
}

interface FeedbackSectionProps {
  lightMode: boolean;
}

export default function FeedbackSection({ lightMode }: FeedbackSectionProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [toast, setToast] = useState(false);

  /* FETCH */
  useEffect(() => {
    const loadFeedback = async () => {
      const { data } = await supabase
        .from("feedback")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setFeedback(data);
    };
    loadFeedback();
  }, []);

  /* SUBMIT */
  const submitFeedback = async () => {
    if (!name || !message || rating === 0) { alert("Please complete all fields"); return; }
    const { error } = await supabase.from("feedback").insert([{ name, rating, message, approved: false }]);
    if (error) { alert("Submission failed"); return; }
    setToast(true);
    setTimeout(() => setToast(false), 2500);
    setName(""); setMessage(""); setRating(0);
  };

  const activeFeedback = feedback.length > 0 ? feedback : defaultFeedback;

  return (
    <section className="py-32 relative">
      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 40, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="fixed top-0 left-0 w-full flex justify-center z-[9999] pointer-events-none"
          >
            <div className="px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl border bg-white/90 text-black border-gray-200">
              Feedback Submitted for Moderation 🚀
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16 items-center justify-between">

        {/* LEFT — Form */}
        <div className="flex-1 max-w-md">
          <h2 className="text-4xl mb-10 font-bold text-foreground">
            Leave Feedback
          </h2>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full mb-4 px-4 py-3.5 rounded-2xl border border-border bg-input text-foreground transition-all duration-300 outline-none shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:-translate-y-[0.5px]"
          />
          <textarea
            placeholder="Your feedback"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full mb-6 px-4 py-3.5 rounded-2xl border border-border bg-input text-foreground resize-none transition-all duration-300 outline-none shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:-translate-y-[0.5px]"
            rows={4}
          />

          <div className="flex gap-3 mb-8">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform ${
                  rating >= star ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-300"
                }`}
              >★</button>
            ))}
          </div>

          <button
            onClick={submitFeedback}
            className="carbon-btn-primary px-8 rounded-2xl py-3 hover:-translate-y-[1px] active:scale-95 shadow-md transition-all duration-300"
          >
            Submit Feedback
          </button>
        </div>

        {/* RIGHT — CardSwap deck */}
        <div className="flex-1 flex items-center justify-center" style={{ minHeight: 420 }}>
          <div style={{ position: "relative", width: 260, height: 340, marginRight: 200, marginTop: 60 }}>
            <CardSwap
              width={260}
              height={340}
              cardDistance={52}
              verticalDistance={58}
              delay={3800}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
            >
              {activeFeedback.map((fb, i) => (
                <Card key={i}>
                  <ReviewCard fb={fb} accent={ACCENT_COLORS[i % ACCENT_COLORS.length]} />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
}