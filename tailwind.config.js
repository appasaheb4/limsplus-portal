/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'text-base': '#ffffff',
        primary: '#454cbf',
        secondary: '#c57c85',
        accent: '#422a68',
        black: '#000000',
        grey: '#6A727F',
        grey_0: '#4a4a4a',
        grey_1: '#707070',
        light_1: '#ebebeb',
        white: '#ffffff',
        background: '#ffffff',
        red: '#ff0000',
        light_white: '#f4f6f6',
        orange: '#ffae1a',
        mono: '#754c00',
      },
      fontFamily: {
        arimaRegular: ['Arima Regular'],
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
