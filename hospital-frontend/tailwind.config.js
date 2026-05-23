export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        sand: {
          50:  "#FAFAF7",
          100: "#F4F3EE",
          200: "#E8E6DF",
          300: "#D4D1C7",
        },
        forest: {
          500: "#0D6E63",
          600: "#0A5C53",
          700: "#084A43",
        },
      },
    },
  },
  plugins: [],
};