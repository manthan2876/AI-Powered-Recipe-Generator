module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#FF6F61', // soft coral color for brand
          secondary: '#4A5568',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
          commissioner: ['Commissioner', 'sans-serif'],
          imprima: ['Imprima', 'sans-serif'],
          kalnia: ['Kalnia', 'serif'],
        },
      },
    },
    plugins: [],
}