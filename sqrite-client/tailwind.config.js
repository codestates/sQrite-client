module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sqrite: {
          green: "#409046",
          yellow: "#F5CF47",
          red: "#E83223"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}