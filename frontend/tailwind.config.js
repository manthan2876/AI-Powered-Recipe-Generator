module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // switch to class-based dark mode so we can toggle programmatically
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#FF3B30', // red brand for light/dark accents
            600: '#cc2a24',
          },
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