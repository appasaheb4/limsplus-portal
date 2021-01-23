import validate from "validate.js";
export { validate };
export const constraintsRole = {
  code: {
    presence: true,
    length: {
      minimum: 4,
      message: "Code must be least 4 characters ",
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
