/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-normal": "rgba(247, 243, 233, 0.928)",
        "light-fighting": "rgba(247, 216, 216, 0.886)",
        "light-flying": "rgba(247, 233, 242, 0.928)",
        "light-poison": "rgba(242, 233, 247, 0.928)",
        "light-ground": "rgba(247, 242, 233, 0.928)",
        "light-rock": "rgba(239, 221, 195, 0.796)",
        "light-bug": "rgba(234, 247, 233, 0.928)",
        "light-ghost": "rgba(245, 233, 247, 0.823)",
        "light-steel": "rgba(247, 243, 233, 0.928)",
        "light-fire": "rgba(247, 233, 233, 0.928)",
        "light-water": "rgba(176, 224, 238, 0.928)",
        "light-grass": "rgba(233, 247, 239, 0.928)",
        "light-electric": "rgba(247, 245, 233, 0.928)",
        "light-psychic": "rgba(247, 233, 243, 0.928)",
        "light-ice": "rgba(233, 238, 247, 0.928)",
        "light-dragon": "rgba(240, 233, 247, 0.928)",
        "light-dark": "rgba(148, 147, 144, 0.27)",
        "light-fairy": "rgba(247, 233, 244, 0.928)",
        "light-unknown": "rgba(247, 243, 233, 0.928)",
        "light-shadow": "rgba(247, 233, 243, 0.928)",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "scale(0.7) translateX(0) rotate(0)",
          },
          "20%": {
            transform: "scale(0.7) translateX(-10px) rotate(- 20deg)",
          },
          "30%": {
            transform: "scale(0.7) translateX(10px) rotate(20deg)",
          },
          "50%": {
            transform: "scale(0.7) translateX(-10px) rotate(- 10deg)",
          },
          "60%": {
            transform: "scale(0.7) translateX(10px) rotate(10deg)",
          },
          "100%": {
            transform: "scale(0.7) translateX(0) rotate(0)",
          },
        },
      },
      animation: {
        shake: "shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0s 1",
      },
    },
  },
  plugins: [],
};
