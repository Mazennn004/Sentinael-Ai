/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Core dark backgrounds
        dark: {
          950: "#05080F",
          900: "#0A1023",
          800: "#0F1A35",
          700: "#162347",
          600: "#1E2D5A",
        },
        // Primary accent — electric cyan
        cyan: {
          50: "#E6FEFF",
          100: "#B3FCFF",
          200: "#80F9FF",
          300: "#4DF6FF",
          400: "#1AF3FF",
          500: "#00D4E6",
          600: "#00A8B8",
          700: "#007C8A",
          800: "#00505C",
          900: "#00242E",
        },
        // Severity colors
        severity: {
          critical: "#FF3B5C",
          high: "#FF6B35",
          medium: "#FFB800",
          low: "#00E68A",
        },
        // Glass effect colors
        glass: {
          white: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.12)",
          highlight: "rgba(0, 212, 230, 0.15)",
        },
      },
    },
  },
  plugins: [],
};