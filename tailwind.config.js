/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        primaryBg: '#1A1A1A',
        secondaryBg: '#242424',
        accentGold: '#C5A059',
        accentBrass: '#A68A4D',
        textPrimary: '#F5F5F5',
        textSecondary: '#CCCCCC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
