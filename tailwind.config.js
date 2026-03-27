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
          950: "#060A0F",
          900: "#0A0E17",
          800: "#101820",
          700: "#141C28",
          600: "#1A2332",
        },
        // Primary accent — teal/cyan
        teal: {
          50: "#E0FCFF",
          100: "#B3F5FA",
          200: "#80EDF5",
          300: "#4DE4F0",
          400: "#00D4E6",
          500: "#00B4C6",
          600: "#0098A8",
          700: "#007C8A",
          800: "#00606C",
          900: "#00444E",
        },
        // Connected / success green
        connected: "#00E68A",
        // Severity colors
        severity: {
          critical: "#FF3B5C",
          high: "#FF6B35",
          medium: "#FFB800",
          low: "#00E68A",
        },
      },
    },
  },
  plugins: [],
};