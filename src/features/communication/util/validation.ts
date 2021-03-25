import validate from "validate.js"
export { validate }
export const constraintsSegmentMapping = {
  equipmentType: {
    presence: true,
    length: {
      minimum: 2,
      message: "EQUIPMENT TYPE must be least 2 characters ",
    },
  },
  dataFlowFrom: {
    presence: true,
    length: {
      minimum: 2,
      message: "SUBMITTER SUBMITTER must be least 2 characters ",
    },
  },
  data_type: {
    presence: true,
    length: {
      minimum: 2,
      message: "DATA TYPE must be least 2 characters",
    },
  }
}
