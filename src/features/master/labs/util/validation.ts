import validate from 'validate.js';
export {validate};
export const labs = {
  code: {
    presence: true,
    length: {
      minimum: 2,
      message: 'Code must be least 2 characters ',
    },
  },
  name: {
    presence: true,
    length: {
      minimum: 2,
      message: 'Name must be least 2 characters',
    },
  },
};
