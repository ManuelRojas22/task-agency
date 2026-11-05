/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hanken Grotesk', 'Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          800: '#991B1B',
          950: '#450A0A',
        },
        surface: {
          base:      '#09090B',
          card:      '#18181B',
          container: '#27272A',
          border:    '#3F3F46',
        },
      },
      borderRadius: {
        card:   '0.75rem',
        badge:  '0.375rem',
        button: '0.5rem',
      },
      boxShadow: {
        executive: '0 4px 20px -2px rgba(0, 0, 0, 0.65)',
        conflict:  '0 0 15px 1px rgba(220, 38, 38, 0.25)',
      },
      fontSize: {
        kpi:  ['2.25rem', { lineHeight: '2.5rem' }],
        h1:   ['1.5rem',  { lineHeight: '2rem' }],
        h2:   ['1.125rem',{ lineHeight: '1.5rem' }],
        base: ['0.875rem',{ lineHeight: '1.25rem' }],
        sm:   ['0.75rem', { lineHeight: '1rem' }],
        xs:   ['0.6875rem',{ lineHeight: '0.875rem' }],
      },
    },
  },
  plugins: [],
};
