import validate from "validate.js"
export { validate }
export const section = {
  departmentCode: {
    presence: true,
  },
  code: {
    presence: true,
    length: {
      minimum: 4,
      message: "Code must be least 4 characters ",
    },
  },  
  name: {
    presence: true,
  },
}
