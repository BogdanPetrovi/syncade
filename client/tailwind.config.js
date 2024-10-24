/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#1A237E',
        secondary: '#42A5F5',
        disabled: '#AAAFB4'
      },
    },

  },
  plugins: [],
}

