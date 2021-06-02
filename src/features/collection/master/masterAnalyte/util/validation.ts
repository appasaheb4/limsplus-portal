import validate from "validate.js";
export { validate };
export const constraintsLabs = {
  code: {
    presence: true,
    length: {
      minimum: 2,
      message: "Code must be least 2 characters ",
    },
  },
  name: {
    presence: true,
    length: {
      minimum: 2,
      message: "Name must be least 2 characters",
    },
  },
};
