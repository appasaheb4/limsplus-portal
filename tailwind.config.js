/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        sm: { min: '0px', max: '767px' },
        md: { min: '768px', max: '2000px' },
      },
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
        'border-red': '#ff0000',
        bgGrey: '#808080',
      },
      fontFamily: {
        arimaRegular: ['Arima Regular'],
        nunitoSansRegular: ['NunitoSans Regular'],
        nunitoSansBold: ['NunitoSans Bold'],
        dancingScriptBold: ['DancingScript-Bold'],
        dancingScriptRegular: ['DancingScript-Regular'],
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
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.arrow-hide': {
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        },
      });
    }),
  ],
};
