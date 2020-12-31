import validate from "validate.js";
import moment from "moment";
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
    format: {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      message:
        "Password should be included Lower case, Upper case, Numbers, special, 6 to 20 characters",
    },
  },
  deginisation: {
    presence: true,
  },
  fullName: {
    presence: true,
  },
  department: {
    presence: true,
  },
  exipreDate: {
    presence: true,
    //Must be born at least 18 years ago
    date: {
      latest: moment().subtract(18, "years"),
      message: "^You must be at least 18 years old to use this service",
    },
  },
  role: {
    presence: true,
  },
  status: {
    presence: true,
  },
};
