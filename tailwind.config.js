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
        screens: {
          'tablet': '640px',
          'ipad': '768px',
          'ipad-pro': '1024px',
        },
        fontFamily: {
          'sail': ['Sail', 'cursive'],
          'inter': ['Inter', 'system-ui', 'sans-serif'],
          'playfair': ['Playfair Display', 'serif'],
        },
        colors: {
          // Enhanced ruby color palette
          ruby: {
            dark: '#4D0019',
            DEFAULT: '#80002A',
            light: '#B3003A',
            lighter: '#E60049',
            lightest: '#FF3366',
          },
          // Additional sophisticated colors
          cream: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
          },
          neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          }
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },
        fontSize: {
          '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],
          'base': ['1rem', { lineHeight: '1.5rem' }],
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
          '6xl': ['3.75rem', { lineHeight: '1' }],
          '7xl': ['4.5rem', { lineHeight: '1' }],
          '8xl': ['6rem', { lineHeight: '1' }],
          '9xl': ['8rem', { lineHeight: '1' }],
        },
        boxShadow: {
          'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          'elegant': '0 4px 25px -2px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          'glow': '0 0 20px rgba(128, 0, 42, 0.3)',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }
      },
    },
    plugins: [],
  };