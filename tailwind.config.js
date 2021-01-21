module.exports = {
  purge: false,
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
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
