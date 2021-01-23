import validate from "validate.js";
export { validate };
export const constraintsDepartment = {
  code: {
    presence: true,
    length: {
      minimum: 4,
      message: "Code must be least 4 characters ",
    },
  },
  name: {
    presence: true,
    length: {
      minimum: 4,
      message: "Name must be least 4 characters",
    },
  },
};
