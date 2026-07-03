import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary_text: "var(--secondary-text)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        layer: "var(--layer)",
        layer_hover: "var(--layer-hover)",
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      transitionDuration: {
        DEFAULT: '150ms',
        'fast': '150ms',
        'moderate': '250ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
