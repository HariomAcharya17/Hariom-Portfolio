import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete
}: any) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible || !ref.current) return;

    const chars = ref.current.querySelectorAll('.split-char');
    if (chars.length === 0) return;

    gsap.fromTo(
      chars,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          onLetterAnimationComplete?.();
        }
      }
    );
  }, [isVisible, text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to)]);

  const words = text.split(" ");
  const Tag: any = tag || "p";

  const style: React.CSSProperties = {
    textAlign: textAlign as any,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };

  return (
    <Tag ref={ref} style={style} className={`split-parent ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="split-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="split-char"
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
          {wIdx < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
