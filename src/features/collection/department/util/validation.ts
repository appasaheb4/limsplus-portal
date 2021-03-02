import validate from "validate.js";
export { validate };
export const constraintsDepartment = {
  lab: {
    presence: true,
    length: {
      minimum: 2,
      message: "Lab must be least 2 characters ",
    },
  },
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
      minimum: 4,
      message: "Name must be least 4 characters",
    },
  },
};
