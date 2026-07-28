import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Search } from "lucide-react";
import { playUISound } from "@/lib/sound";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar(props: any) {
  const { lightMode, setLightMode } = props;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-3"
    >
      <div
        className={`pointer-events-auto transition-all duration-300 flex flex-col items-center w-full max-w-6xl ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        {/* SLEEK COMPACT NAVBAR SHELL */}
        <div className="px-4 md:px-5 py-2 flex items-center justify-between rounded-full border border-border/80 bg-background/90 dark:bg-neutral-900/90 backdrop-blur-xl text-foreground w-full shadow-sm hover:shadow-md transition-all duration-300">
          
          {/* LEFT: BRAND NAME */}
          <Link
            to="/"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-90 shrink-0 mr-2"
          >
            <span className="text-xs md:text-sm font-bold tracking-tight text-foreground">
              Hariom Acharya
            </span>
          </Link>

          {/* CENTER: DESKTOP NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 mx-auto">
            {links.map((l) => {
              const isActive =
                l.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(l.href);

              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`relative text-xs font-medium transition-colors ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-secondary_text hover:text-foreground"
                  }`}
                >
                  {l.label}

                  {isActive && (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {/* ASK AI HIGHLIGHTED BUTTON */}
            <Link
              to="/ai"
              className={`ml-1 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                location.pathname === "/ai"
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              }`}
            >
              <Sparkles size={12} className="text-primary animate-pulse" />
              <span>Ask AI</span>
            </Link>
          </div>

          {/* RIGHT: SEARCH, UIVERSE POWER THEME TOGGLE & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
            <button
              onClick={() =>
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/80 bg-layer/50 text-[11px] font-mono text-secondary_text hover:text-foreground hover:bg-layer transition-all focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open Search Command Palette (Cmd+K)"
              title="Open Search (⌘K)"
            >
              <Search size={12} />
              <span>Search</span>
              <kbd className="px-1 py-0.5 rounded bg-background border border-border text-[9px]">⌘K</kbd>
            </button>

            {/* UIVERSE POWER THEME SWITCH BUTTON */}
            <div className="power-switch-wrapper theme-toggle">
              <input
                id="theme-power-checkbox"
                type="checkbox"
                checked={!lightMode}
                onChange={() => {
                  setLightMode(!lightMode);
                  playUISound("toggle");
                }}
              />
              <label
                className="power-switch"
                htmlFor="theme-power-checkbox"
                title={lightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                aria-label="Toggle light and dark theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider">
                  <path
                    d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                  ></path>
                </svg>
              </label>
            </div>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              className="lg:hidden p-1 text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              title="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full mt-2 p-4 rounded-2xl border border-border/80 bg-background/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-xl space-y-3 pointer-events-auto"
            >
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={`p-2.5 rounded-xl border border-border/50 text-center transition-all ${
                      location.pathname === l.href
                        ? "bg-primary/10 text-primary border-primary/30 font-bold"
                        : "text-secondary_text hover:text-foreground hover:bg-layer"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2">
                <Link
                  to="/ai"
                  onClick={() => setOpen(false)}
                  className="w-full py-2 px-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles size={14} />
                  <span>Ask AI Assistant</span>
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
                  }}
                  className="py-2 px-3 rounded-xl border border-border text-xs text-secondary_text flex items-center justify-center gap-1 font-mono shrink-0"
                >
                  <Search size={13} />
                  <span>Search</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}