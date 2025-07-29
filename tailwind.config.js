/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // very important
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#005C8E",
        secondary: "#028CA8",
        accent:    "#FFC93C",
        light:     "#F5FAFF",
        dark:      "#0F1B2A",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
