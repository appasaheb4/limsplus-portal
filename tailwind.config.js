const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'text-base': '#ffffff',
        gray: '#696969',
        'gray-light': '#C4C4C4',
        'gray-dark-secondary': '#979797',
        'gray-secondary': '#C4C4C4',
        rose: colors.rose,
        orange: '#E7503D',
        primaryCharcoal: '#212721',
      },
      fontFamily: {
        nunitoSansRegular: ['Nunito Sans Regular'],
        nunitoSansBold: ['Nunito Sans Bold'],
        inspiration: ['Inspiration Regular'],
        FugazOne: ['Fugaz One'],
      },
      fontSize: {
        xs: '8px',
        '2xs': '10px',
        '3xs': '12px',
        '4xs': '14px',
        md: '16px',
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '100px': '100px',
      },
      height: {
        'screen/2': '50vh',
        screen98: '98vh',
        screen96: '96vh',
        screen94: '94vh',
        screen92: '92vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      },
    },
    borderWidth: {
      DEFAULT: '1px',
    },
  },
  styles: {
    colors: {
      lightBack: '',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderRadius: ['hover', 'first', 'last'],
      zIndex: ['hover'],
      borderCollapse: ['hover', 'focus'],
    },
  },
  corePlugins: {
    tableLayout: false,
  },
  plugins: [
    plugin(function ({addUtilities}) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
