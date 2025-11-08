/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        light: "#EFECE3",
        secondary: "#8FABD4",
        primary: "#4A70A9",
        dark: "#000000"
      }
    },
  },
  plugins: [],
}