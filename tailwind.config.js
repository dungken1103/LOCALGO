/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js,ts,tsx}"],
  darkMode: 'class', // use .dark on <html> to toggle dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f8ff',
          500: '#2563eb'
        }
      }
    },
  },
};
