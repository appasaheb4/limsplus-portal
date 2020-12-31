import validate from "validate.js";
export { validate };
export const constraints = {
  username: {
    presence: true,
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed",
    },
    length: {
      minimum: 10,
      message: "enter 10 ch",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters",
    },
  },
};
