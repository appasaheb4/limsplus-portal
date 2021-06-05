import validate from "validate.js";
export { validate };
export const constraintsSection = {
  code: {
    presence: true,
    length: {
      minimum: 2,
      message: "Code name must be least 2 characters ",
    },
  },
  description: {
    presence: true,
    length: {
      minimum: 2,
      message: "Description must be least 2 characters ",
    },
  },
  
};
