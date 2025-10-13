
module.exports = {
  plugins: [
    // Use the new Tailwind PostCSS plugin wrapper
    require('@tailwindcss/postcss')(),
    require('autoprefixer')(),
  ],
};
