import validate from "validate.js";
export { validate };
export const masterAnalyte = {
  lab: {
    presence: true,
    length: {
      minimum: 2,
      message: "Code must be least 2 characters ",
    },
  },
};
