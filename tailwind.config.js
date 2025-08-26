// tailwind.config.js (ESM)
import typography from "@tailwindcss/typography";
import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js", // note the leading "./"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005C8E",
        secondary: "#028CA8",
        accent: "#FFC93C",
        light: "#F5FAFF",
        dark: "#0F1B2A",
        BgOnDark: "#002B5B",
      },
      keyframes: {
        floatX: {
          "60%, 100%": { transform: "translateX(50)" },
          "50%": { transform: "translateX(50px)" },
        },
      },
      animation: {
        floatX: "floatX 6s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [typography, flowbite],
};
