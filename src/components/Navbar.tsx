import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "scale-95" : "scale-100"
      }`}
    >

      {/* 🔥 GLASS CONTAINER */}
      <div
        className={`px-6 py-3 flex items-center justify-between rounded-full backdrop-blur-xl border shadow-xl ${
          lightMode
            ? "bg-white/70 border-gray-200"
            : "bg-white/10 border-white/10"
        }`}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)"
        }}
      >

       <a href="#" className="text-lg font-bold gradient-text mr-6 md:mr-10">
  HA
</a>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {links.map((l) => {

            const isActive = active === l.href.replace("#", "");

            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-sm transition-all ${
                  isActive
                    ? "text-purple-500 font-semibold"
                    : lightMode
                      ? "text-gray-700 hover:text-purple-600"
                      : "text-gray-300 hover:text-white"
                }`}
              >

                {l.label}

                {/* 🔥 ACTIVE INDICATOR */}
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-500"
                  />
                )}

              </a>
            );
          })}

          {/* 🔥 iOS TOGGLE */}
          <button
            onClick={() => setLightMode(!lightMode)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
              lightMode ? "bg-[#34c759]" : "bg-gray-600"
            }`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-5 h-5 bg-white rounded-full shadow ${
                lightMode ? "ml-auto" : ""
              }`}
            />
          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className={`md:hidden ${
            lightMode ? "text-black" : "text-white"
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
            className={`mt-3 px-6 py-4 rounded-xl backdrop-blur-xl border ${
              lightMode
                ? "bg-white/80 border-gray-200"
                : "bg-white/10 border-white/10"
            }`}
          >

            <div className="flex flex-col gap-4">

              {links.map((l) => {

                const isActive = active === l.href.replace("#", "");

                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm ${
                      isActive
                        ? "text-purple-500 font-semibold"
                        : lightMode
                          ? "text-gray-700"
                          : "text-gray-300"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}

              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setLightMode(!lightMode)}
                className={`w-14 h-7 flex items-center rounded-full p-1 ${
                  lightMode ? "bg-[#34c759]" : "bg-gray-600"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-5 h-5 bg-white rounded-full shadow ${
                    lightMode ? "ml-auto" : ""
                  }`}
                />
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}