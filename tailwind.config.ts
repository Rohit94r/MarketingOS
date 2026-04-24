import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0A",
        ion: "#3B82F6",
        violetsoft: "#8B5CF6"
      },
      boxShadow: {
        glow: "0 0 48px rgba(59, 130, 246, 0.22)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.32)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
