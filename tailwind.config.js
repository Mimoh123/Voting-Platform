import src from '@eslint/js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // colors: {
    //   destructive: 'bg-transparent border-2 border-red-500 p-2 ',
    // },
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      backgroundImage: {
        'hero-image': 'url(./src/assets/hero.jpeg)',
      },
      colors: {
        'lil-light-black': '#202020',
        'light-black': '#404040',
        'need-blue': '#22577A',
        'need-gray': '#F6FAFC',
        'need-dark-gray': '#8E92A2',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'bg-transparent border-2 border-red-500 p-2 ',
        },
      },
    },
  },
  plugins: [],
};
