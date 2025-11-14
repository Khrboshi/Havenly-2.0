/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14B8A6",
        "primary-dark": "#0D9488"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};
