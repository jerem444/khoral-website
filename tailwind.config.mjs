/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#333333',
        accent: '#666666',
        dark: '#000000',
        light: '#ffffff',
      },
      fontFamily: {
        sans: ['Caviar Dreams', 'Inter', 'sans-serif'],
        display: ['Caviar Dreams', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 20%)',
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 