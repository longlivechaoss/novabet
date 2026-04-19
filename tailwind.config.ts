import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        nova: {
          darkest: "#0D0F1A",
          bg: "#141420",
          card: "#1C1E2E",
          elevated: "#252738",
          border: "#2E3045",
          blue: "#1652F0",
          blueLight: "#3B6FFF",
          blueBright: "#6B93FF",
          text: "#F1F5F9",
          textMuted: "#8891A5",
          green: "#10D894",
          ruby: "#E63946",
          gold: "#1652F0",
          goldBright: "#6B93FF",
          pink: "#1652F0"
        }
      },
      backgroundImage: {
        "nova-cta": "linear-gradient(135deg, #1652F0 0%, #3B6FFF 100%)",
        "nova-subtle": "linear-gradient(135deg, #1C1E2E 0%, #252738 100%)",
        "nova-dark": "linear-gradient(180deg, #0D0F1A 0%, #141420 100%)"
      }
    }
  },
  plugins: []
};

export default config;
