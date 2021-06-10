import validate from "validate.js";
export { validate };
export const masterAnalyte = {
  lab: {
    presence: true,
    length: {
      minimum: 2,
      message: "Must be least 2 characters ",
    },
  },
  analyteCode:{
    presence:true,
    length: {
      minimum: 2,
      message: "Must be least 2 characters ",
    },
  }
};
