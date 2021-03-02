import validate from "validate.js";
export { validate };
export const constraintsRole = {
  code: {
    presence: true,
    length: {
      minimum: 2,
      message: "Code must be least 2 characters ",
    },
  },
  description: {
    presence: true,
    length: {
      minimum: 4,
      message: "Description must be least 4 characters",
    },
  },
};
