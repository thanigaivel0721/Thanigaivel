import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: "#ff6b3d",
        lime: "#C2EF3A",
        grape: "#BF5AF2",
        rose: "#F43F5E",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        instrument: ["var(--font-instrument)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      scale: {
        "115": "1.15",
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "38": "9.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
