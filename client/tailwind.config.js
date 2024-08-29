/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'bg-image': 'url("/Hero-Background-notecode@2x.png")',
        'bg-gradient':
          'linear-gradient(to bottom right, rgba(183, 135, 245, 1), rgba(116, 62, 228, 1));',
      },
    },
  },
  plugins: [],
};
