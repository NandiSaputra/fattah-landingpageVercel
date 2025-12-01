/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
      },
      colors: {
        "fattah-green": {
          DEFAULT: "#226A38",
          dark: "#15723D",
          light: "#2D8B4C",
          hover: "#1B552E",
        },
        "fattah-border": "#414651",
      },
    },
  },
  plugins: [],
};
