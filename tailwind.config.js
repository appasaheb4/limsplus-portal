/* eslint-disable */
const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: false,
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'FugazOne': ['Fugaz One']  
      }
    },
  },
  styles: {
    colors: {
      lightBack: '',
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      borderRadius: ["hover", "first", "last"],
      zIndex: ["hover"],
      borderCollapse: ['hover', 'focus'],
    },
  },
  corePlugins: {
    tableLayout: false,
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      )
    })
  ],
};
