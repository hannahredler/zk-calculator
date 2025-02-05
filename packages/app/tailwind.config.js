/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D0F14",
        primary: "#00FFFF",
        secondary: "#32FF7E",
        accent: "#FF00FF",
        highlight: "#FFDD00",
      },
      boxShadow: {
        primary: "0 0 10px var(--primary)",
      },
    },
  },
  plugins: [],
};
