/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./configs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5a3817",
        secondary: "#e9c365",
        thirdary: "#144b6e",
        accent: "#e97e00",
        "secondary-accent": "#e97ea8",
        "thirdary-accent": "#7dd5e8",
        natural: "#f3e1bc",
        search: "#00698a",
        reset: "#cc6666",
        complate: "#006400",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("daisyui")],
};
