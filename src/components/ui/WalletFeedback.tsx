import { useState, useEffect, useRef } from "react";
import "./WalletFeedback.css";

export interface FeedbackItem {
  id?: number | string;
  name: string;
  message: string;
  rating: number;
}

interface WalletFeedbackProps {
  feedbacks: FeedbackItem[];
  delay?: number;
}

const CARD_THEMES = [
  { bg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)", text: "#334155", stars: "#eab308" }, // Crisp slate white
  { bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", text: "#0369a1", stars: "#0284c7" }, // Soft ice blue
  { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", text: "#6b21a8", stars: "#8b5cf6" }, // Soft lavender
  { bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", text: "#15803d", stars: "#16a34a" }, // Soft mint green
  { bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", text: "#c2410c", stars: "#f97316" }, // Soft cream orange
];

export default function WalletFeedback({ feedbacks, delay = 4000 }: WalletFeedbackProps) {
  const [order, setOrder] = useState<number[]>([]);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and update card stack order
  useEffect(() => {
    if (feedbacks.length > 0) {
      setOrder(Array.from({ length: feedbacks.length }, (_, i) => i));
    }
  }, [feedbacks]);

  // Cycle function: slides out the front-most card and places it at the back
  const cycleDeck = () => {
    if (order.length < 2 || animatingIndex !== null) return;

    const frontCardIdx = order[order.length - 1];
    setAnimatingIndex(frontCardIdx);

    // Wait for the slide-out transition to complete (400ms matching CSS transition)
    setTimeout(() => {
      setOrder((prev) => {
        if (prev.length < 2) return prev;
        const copy = [...prev];
        const last = copy.pop()!;
        return [last, ...copy]; // Move front-most card to the bottom/back
      });
      setAnimatingIndex(null);
    }, 400);
  };

  // Auto-cycle logic
  useEffect(() => {
    if (isHovered || order.length < 2) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      cycleDeck();
    }, delay);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, order.length, delay, animatingIndex]);

  if (feedbacks.length === 0) return null;

  // Calculate statistics for the pocket
  const totalCount = feedbacks.length;
  const avgRating = (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalCount).toFixed(1);

  return (
    <div className="wallet-container">
      <div
        className="wallet"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={cycleDeck}
      >
        {/* Wallet Back */}
        <div className="wallet-back" />

        {/* Cards */}
        {feedbacks.map((fb, idx) => {
          const stackIndex = order.indexOf(idx);

          // If the card is not in the active stack order list (e.g. initial render mismatch), hide it
          if (stackIndex === -1) return null;

          const isFront = stackIndex === feedbacks.length - 1;
          const isAnimating = animatingIndex === idx;

          // Dynamically compute positioning variables based on stack index
          const N = feedbacks.length;
          const pct = N > 1 ? stackIndex / (N - 1) : 1;

          // Unhovered: bottom base layout from 90px (back) to 40px (front)
          const bottomVal = N > 1 ? 90 - pct * 50 : 65;

          // Hovered: fans out from -75px (back) to -10px (front)
          const hoverTranslateY = N > 1 ? -75 + pct * 65 : -40;

          // Hovered: rotation fans from -3deg to +3deg
          const hoverRotate = N > 1 ? -4 + pct * 8 : 0;

          const theme = CARD_THEMES[idx % CARD_THEMES.length];
          const cardStyle = {
            "--card-bottom": `${bottomVal}px`,
            "--card-z-index": 10 + stackIndex,
            "--hover-translate-y": `${hoverTranslateY}px`,
            "--hover-rotate": `${hoverRotate}deg`,
            background: theme.bg,
            color: theme.text,
          } as React.CSSProperties;

          return (
            <div
              key={idx}
              className={`wallet-card ${isAnimating ? "sliding-out" : ""}`}
              style={cardStyle}
              onClick={(e) => {
                // If it is the front card, trigger manual cycle on click.
                // Prevent event propagation so clicking individual card cycles once.
                e.stopPropagation();
                if (isFront) {
                  cycleDeck();
                }
              }}
            >
              <div className="wallet-card-inner">
                {/* Top Section: Stars rating */}
                <div className="wallet-card-top">
                  <div className="wallet-card-stars" style={{ color: theme.stars }}>
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Middle Message Section */}
                <div className="wallet-card-middle">
                  <p className="wallet-card-message">"{fb.message}"</p>
                </div>

                {/* Bottom Section: Reviewer Name only */}
                <div className="wallet-card-bottom">
                  <span className="wallet-card-value font-bold text-xs tracking-wider">{fb.name}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Pocket */}
        <div className="pocket">
          <svg className="pocket-svg" viewBox="0 0 280 160" fill="none">
            <path
              d="M 0 20 C 0 10, 5 10, 10 10 C 20 10, 25 25, 40 25 L 240 25 C 255 25, 260 10, 270 10 C 275 10, 280 10, 280 20 L 280 120 C 280 155, 260 160, 240 160 L 40 160 C 20 160, 0 155, 0 120 Z"
            />
            <path
              d="M 8 22 C 8 16, 12 16, 15 16 C 23 16, 27 29, 40 29 L 240 29 C 253 29, 257 16, 265 16 C 268 16, 272 16, 272 22 L 272 120 C 272 150, 255 152, 240 152 L 40 152 C 25 152, 8 152, 8 120 Z"
              strokeDasharray="6 4"
            />
          </svg>

          <div className="pocket-content">
            <div style={{ position: "relative", height: 24, width: "100%" }}>
              <div className="balance-stars">★★★★★</div>
              <div className="balance-real">{avgRating} ★ ({totalCount} Reviews)</div>
            </div>
            <div style={{ color: "var(--secondary-text)", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Overall Rating
            </div>

            {/* Eye Icon Wrapper */}
            <div className="eye-icon-wrapper">
              {/* Eye Slash */}
              <svg
                className="eye-icon eye-slash"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>

              {/* Eye Open */}
              <svg
                className="eye-icon eye-open"
                style={{ opacity: 0 }}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
