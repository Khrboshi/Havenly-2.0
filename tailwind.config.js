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
colors: {
  brand: {
    DEFAULT: "#0D7A7E",
    dark: "#0B666A",
    light: "#E6F4F3",
  },
  surface: {
    DEFAULT: "#FFFFFF",
    soft: "#F7FBFA",
  }
},
borderRadius: {
  xl: "1rem",
  '2xl': "1.5rem",
},
boxShadow: {
  card: "0 2px 8px rgba(0,0,0,0.06)",
  soft: "0 1px 5px rgba(0,0,0,0.04)",
},
