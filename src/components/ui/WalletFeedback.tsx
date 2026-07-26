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
  { bg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)", text: "#0f172a", stars: "#eab308" },
  { bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", text: "#0369a1", stars: "#0284c7" },
  { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", text: "#6b21a8", stars: "#8b5cf6" },
  { bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", text: "#15803d", stars: "#16a34a" },
  { bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", text: "#c2410c", stars: "#f97316" },
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

    setTimeout(() => {
      setOrder((prev) => {
        if (prev.length < 2) return prev;
        const copy = [...prev];
        const last = copy.pop()!;
        return [last, ...copy];
      });
      setAnimatingIndex(null);
    }, 380);
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

  return (
    <div className="wallet-container select-none">
      <div
        className={`wallet ${isHovered ? "is-hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => {
          // Trigger card cycle on mobile tap
          cycleDeck();
          setTimeout(() => setIsHovered(false), 1500);
        }}
        onClick={cycleDeck}
      >
        {/* Wallet Back */}
        <div className="wallet-back" />

        {/* Cards Stack */}
        {feedbacks.map((fb, idx) => {
          const stackIndex = order.indexOf(idx);
          if (stackIndex === -1) return null;

          const isFront = stackIndex === feedbacks.length - 1;
          const isAnimating = animatingIndex === idx;

          const N = feedbacks.length;
          const pct = N > 1 ? stackIndex / (N - 1) : 1;

          // Unhovered base positioning
          const bottomVal = N > 1 ? 85 - pct * 45 : 65;

          // Hovered fan out positioning
          const hoverTranslateY = N > 1 ? -75 + pct * 65 : -40;
          const hoverRotate = N > 1 ? -4.5 + pct * 9 : 0;

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
                e.stopPropagation();
                if (isFront) {
                  cycleDeck();
                }
              }}
            >
              <div className="wallet-card-inner">
                {/* Top Section: Rating Stars */}
                <div className="wallet-card-top">
                  <div className="wallet-card-stars" style={{ color: theme.stars }}>
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Middle Section: Feedback Message */}
                <div className="wallet-card-middle">
                  <p className="wallet-card-message">"{fb.message}"</p>
                </div>

                {/* Bottom Section: Reviewer Name */}
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

          {/* Pocket Content Label strictly Feedbacks */}
          <div className="pocket-content">
            <div className="pocket-label">
              Feedbacks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
