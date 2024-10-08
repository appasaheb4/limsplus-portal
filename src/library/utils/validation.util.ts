import validate from 'validate.js';
import dayjs from 'dayjs';
export {validate};
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value: any) {
    return +dayjs.utc(value);
  },
  // Input is a unix timestamp
  format: function (value: any, options: any) {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return dayjs.utc(value).format(format);
  },
});

export const constraintsChangePassword = {
  oldPassword: {
    presence: true,
    format: {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      message:
        'Password should be included Lower case, Upper case, Numbers, special, 6 to 20 characters',
    },
  },
  newPassword: {
    presence: true,
    format: {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      message:
        'Password should be included Lower case, Upper case, Numbers, special, 6 to 20 characters',
    },
  },
  confirmPassword: {
    presence: true,
    format: {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      message:
        'Password should be included Lower case, Upper case, Numbers, special, 6 to 20 characters',
    },
  },
};
