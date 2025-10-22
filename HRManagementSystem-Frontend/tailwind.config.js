/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // Scans index.html for Tailwind classes
    "./src/**/*.{js,ts,jsx,tsx}",  // Scans all JS/JSX/TS/TSX files in src/
  ],
  theme: {
    extend: {},  // Add custom themes here if needed (e.g., colors)
  },
  plugins: [],
};