import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode switching
  theme: {
    extend: {
      colors: {
        // Dynamic theme colors using CSS variables
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)", // Map Tailwind colors to your dynamic theme variables
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        highlight: "var(--highlight)", // Highlight for light/dark theme accents
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
};

export default config;
