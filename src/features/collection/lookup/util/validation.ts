import validate from "validate.js";
export { validate };
export const constraintsLookup = {
  document: {
    presence: true,
    length: {
      minimum: 2,
      message: "Document name must be least 2 characters ",
    },
  },
  field_name: {
    presence: true,
    length: {
      minimum: 2,
      message: "Field name must be least 2 characters ",
    },
  },
  code: {
    presence: true,
    length: {
      minimum: 2,
      message: "Code must be least 2 characters ",
    },
  },
  value: {
    presence: true,
    length: {
      minimum: 2,
      message: "Value must be least 2 characters ",
    },
  },
  description: {
    presence: true,
    length: {
      minimum: 4,
      message: "Description must be least 4 characters",
    },
  },
};
