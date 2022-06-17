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

export const constraintsSessionManagement = {
  lab: {
    type: 'array',
  },
  user: {
    type: 'array',
  },
  department: {
    type: 'array',
  },
  variable: {
    presence: true,
  },
  value: {
    presence: true,
  },
};

export const constraintsNoticeBoard = {
  lab: {
    presence: true,
  },
  header: {
    presence: true,
  },
  message: {
    presence: true,
  },
  action: {
    presence: true,
  },
};
