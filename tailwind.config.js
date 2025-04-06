export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        zoomIn: "zoomIn 0.3s ease-out",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      colors: {
        lightgray: "#E8E8E8",
        mediumgray: "#DADADA",
        darkgray: "#9C9C9C",
        charcoal: "#666666",
      },
    },
  },
  plugins: [],
};
