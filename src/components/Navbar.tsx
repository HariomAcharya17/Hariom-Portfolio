import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { playUISound } from "@/lib/sound";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Bespoke", href: "#hari-ai" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar(props: any) {

  const { lightMode, setLightMode } = props;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // 🔥 Scroll detect
  useEffect(() => {
    const handleScroll = () => {

      setScrolled(window.scrollY > 50);

      const sections = links.map(l => l.href.replace("#", ""));

      let current = "";

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 100;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4"
    >
      <div
        className={`pointer-events-auto transition-all duration-500 flex flex-col items-center ${
          scrolled ? "scale-95" : "scale-100"
        }`}
      >

        {/* UI SHELL CONTAINER */}
        <div
          className="px-6 py-3 flex items-center justify-between rounded-full border bg-layer text-foreground w-[90vw] lg:w-auto max-w-5xl"
        >

          <div className="flex items-center">
            <a
              href="#"
              className={`text-lg font-bold mr-4 transition-colors ${lightMode ? "text-black" : "text-white"
                }`}
            >
              HA
            </a>
            <button
              onClick={() => {
                setLightMode(!lightMode);
                playUISound("toggle");
              }}
              className="theme-toggle w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200/20 transition-colors text-foreground focus:outline-none outline-none"
              aria-label="Toggle theme"
            >
              {lightMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-6 ml-auto mr-6">

            {links.map((l) => {

              const isActive = active === l.href.replace("#", "");

              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative text-sm transition-colors duration-fast ${isActive
                    ? "text-primary font-bold"
                    : "text-secondary_text hover:text-foreground font-medium"
                    }`}
                >

                  {l.label}

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
                    />
                  )}

                </a>
              );
            })}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className={`lg:hidden ${lightMode ? "text-black" : "text-blue-500"
              }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* 🔥 MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-3 px-6 py-4 rounded-2xl border bg-layer shadow-sm w-full"
            >

              <div className="flex flex-col gap-4">

                {links.map((l) => {

                  const isActive = active === l.href.replace("#", "");

                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`text-sm transition-colors duration-fast ${isActive
                        ? "text-primary font-bold"
                        : "text-secondary_text"
                        }`}
                    >
                      {l.label}
                    </a>
                  );
                })}


              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  );
}