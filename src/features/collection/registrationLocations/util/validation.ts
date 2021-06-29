import validate from "validate.js"
export { validate }
export const registrationLocations = {
  locationCode: {
    presence: true,
  },
  locationName: {
    presence: true,
  },
}
