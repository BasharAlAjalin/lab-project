/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        barca: {
          blue: "#004D98",
          maroon: "#A50044",
          gold: "#EDBB00",
          ink: "#0B1020",
          surface: "#0F172A",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(237,187,0,.22), 0 12px 40px rgba(0,0,0,.12)",
      },
    },
  },
  plugins: [],
};
