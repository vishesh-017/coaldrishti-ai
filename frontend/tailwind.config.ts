import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coal: {
          950: "#050A12",
          900: "#080D16",
          850: "#0B111C",
          800: "#111827",
          750: "#151D2B",
          700: "#1B2433",
          600: "#202936",
          500: "#293241",
        },
        mining: {
          emerald: "#00C896",
          green: "#08B98A",
          deep: "#0B8F72",
        },
        industrial: {
          cyan: "#28B9C7",
          amber: "#F5B51B",
          red: "#FF5C68",
          blue: "#4F9CFF",
        },
        border: "hsl(217.2 32.6% 17.5%)",
        background: "#050A12",
        foreground: "#F1F5F9",
        primary: {
          DEFAULT: "#00C896",
          foreground: "#050A12",
        },
        secondary: {
          DEFAULT: "#151D2B",
          foreground: "#F1F5F9",
        },
        destructive: {
          DEFAULT: "#FF5C68",
          foreground: "#F1F5F9",
        },
        muted: {
          DEFAULT: "#1B2433",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#28B9C7",
          foreground: "#050A12",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Outfit", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      keyframes: {
        "radar-pulse": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "50%": { transform: "scale(2.2)", opacity: "0.2" },
          "100%": { transform: "scale(3.2)", opacity: "0" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "radar-pulse": "radar-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "scanline": "scanline 8s linear infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
