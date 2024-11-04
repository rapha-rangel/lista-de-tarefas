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
    keyframes: {
      fadeInModal: {
        '0%': { display:"none",position:"fixed", opacity:"0", transform:"translateX(-40%) translateY(-50%)" },
        '100%': { position:"fixed", opacity:"1",transform:"translateX(-50%) translateY(-50%)"  },
      },
      fadeOutModal: {
        '0%': { position:"fixed", opacity:"1",transform:"translateX(-50%) translateY(-50%)" },
        '100%': { display:"none",position:"fixed", opacity:"0", transform:"translateX(-40%) translateY(-50%)" },
      },
    },
    animation: {
      animateOutModal: 'fadeOutModal 1s ease-in-out forwards',
      animateInModal: 'fadeInModal 2s ease-in-out forwards '
    },
  },
  plugins: [],
}

