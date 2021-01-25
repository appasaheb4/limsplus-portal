/* eslint-disable */
module.exports = {
  purge: false,
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {

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
  plugins: [],
};
