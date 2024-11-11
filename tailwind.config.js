/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./auth/**/*.html",
    "./post/**/*.html",
    "./profile/index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/css/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}