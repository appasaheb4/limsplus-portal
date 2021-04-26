import validate from "validate.js"
export { validate }

export const constraintsLogin = {
  lab: {
    presence: true,
    length: {
      minimum: 2,
      message: "Lab must be least 2 characters ",
    },
  },
  role: {
    presence: true,
    length: {
      minimum: 2,
      message: "Role must be least 2 characters ",
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
}

export const constraintsForgotPassword = {
  userId: {
    presence: true,
    length: {
      minimum: 6,
      message: "UserId must be least 6 characters",
    },
  },
  email: {
    email: true,
  },  
  mobileNo: {
    length: {maximum: 10},
    format: {
      pattern: "[0-9]+",
      flags: "i",
      message: "Can only contain 0-9",
    },
  },
}
