/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        paper2: "#F1EAD9",
        ink: "#1C1A2E",
        inkSoft: "#5B5875",
        inkFaint: "#8B88A3",
        indigo: "#2B2A55",
        indigoDeep: "#181735",
        marigold: "#DE9A34",
        marigoldSoft: "#F6E3BE",
        sindoor: "#BE4A3C",
        sage: "#517A5B",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        xl2: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,26,46,0.04), 0 8px 24px -12px rgba(28,26,46,0.18)",
      },
    },
  },
  plugins: [],
};
