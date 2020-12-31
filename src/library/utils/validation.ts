import validate from "validate.js";
export { validate };
export const constraints = {
  lab: {
    presence: true,
    length: {
      minimum: 4,
      message: "Lab must be least 4 characters ",
    },
  },
  userId: {
    presence: true,
    length: {
      minimum: 4,
      message: "UserId must be least 4 characters",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "Password must be at least 6 characters",
    },
  },
};
