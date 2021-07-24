import validate from "validate.js"
export { validate }
export const library = {
  code: {
    presence: true,
    length: {
      minimum: 2,
      message: "Must be least 2 characters ",
    },
  },   
}
