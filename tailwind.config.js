/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nyaya: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B7CF6',
          600: '#7C6AE4',
          700: '#6D5AD1',
          800: '#5B49B0',
          900: '#4A3B8F',
        },
        sos: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 16px -2px rgba(74, 59, 143, 0.12)',
        lift: '0 8px 30px -6px rgba(74, 59, 143, 0.25)',
        sos: '0 8px 30px -4px rgba(239, 68, 68, 0.5)',
      },
    },
  },
  plugins: [],
};
