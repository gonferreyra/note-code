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
      },
    },
  },
  plugins: [],
};
