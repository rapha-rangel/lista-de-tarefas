/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-auto': 'repeat(auto-fill, 120px)',
      },
    },
  },
  plugins: [],
}

