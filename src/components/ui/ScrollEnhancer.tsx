import { useEffect, useRef } from "react";

export default function ScrollEnhancer() {
  const lastVibrateTime = useRef(0);
  const lastSectionId = useRef("");

  useEffect(() => {
    const triggerHaptic = (duration = 8) => {
      const now = Date.now();
      // 400ms cooldown buffer so haptics feel refined, subtle, and pleasant
      if (now - lastVibrateTime.current > 400) {
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          try {
            navigator.vibrate(duration);
            lastVibrateTime.current = now;
          } catch (e) {
            // Ignore vibration permission or hardware unsupported errors
          }
        }
      }
    };

    const handleScroll = () => {
      // Find key sections in the viewport
      const sections = document.querySelectorAll("section[id], footer, header");
      const scrollY = window.scrollY + window.innerHeight * 0.35;

      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const id = el.id || el.tagName;

        if (scrollY >= top && scrollY < top + height) {
          if (lastSectionId.current !== id) {
            lastSectionId.current = id;
            triggerHaptic(10);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
