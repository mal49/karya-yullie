// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      // Your files where Tailwind classes are used, e.g.,
      './src/**/*.{html,js,jsx,ts,tsx}',
      './index.html',
    ],
    theme: {
      extend: {
        fontFamily: {
          'sail': ['Sail', 'cursive'],
          'roboto': ['Roboto', 'sans-serif'],
        },
        colors: {
          // Your custom ruby color palette
          ruby: {
            dark: '#4D0019',
            DEFAULT: '#80002A', // This becomes `text-ruby` (no shade suffix)
            light: '#B3003A',
            lighter: '#E60049',
            lightest: '#FF3366',
          },
          // You can add other custom colors here if needed
          // e.g., 'midnight': '#121063',
        },
      },
    },
    plugins: [],
  };