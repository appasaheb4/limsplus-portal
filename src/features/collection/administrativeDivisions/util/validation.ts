import validate from "validate.js"
export { validate }
export const administrativeDiv = {
  country: {
    presence: true,
  },
  state: {
    presence: true,
  },   
  district: {
    presence: true,
  },
}
