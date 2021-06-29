import validate from "validate.js"
export { validate }
export const doctors = {
  doctorCode: {
    presence: true,
  },
  doctorName: {
    presence: true,
  },
}
