/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4CA7A3",
          light: "#76C5C0",
          dark: "#2E837F",
          bg: "#F7FBFA"
        },
        accent: {
          yellow: "#F9D976",
          peach: "#F6B8A1",
          pink: "#FCE7F3"
        }
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px"
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Rounded", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
