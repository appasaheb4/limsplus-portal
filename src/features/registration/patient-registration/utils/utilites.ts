import dayjs from 'dayjs';
import _ from 'lodash';
export const getAgeAndAgeUnit = ageObject => {
  if (ageObject.years > 0) {
    return { age: ageObject.years, ageUnit: 'year' };
  } else if (ageObject.months > 0) {
    return { age: ageObject.months, ageUnit: 'month' };
  } else if (ageObject.weeks > 0) {
    return { age: ageObject.weeks, ageUnit: 'week' };
  } else {
    return { age: ageObject.days, ageUnit: 'day' };
  }
};

export const getDiffByDate = date => {
  const date1 = dayjs(new Date());
  const date2 = dayjs(date);
  const years = date1.diff(date2, 'year');
  const months = date1.diff(date2, 'month');
  const weeks = date1.diff(date2, 'week');
  const days = date1.diff(date2, 'day');
  const hours = date1.diff(date2, 'hour');
  return { years, months, weeks, days, hours };
};

export const getAgeByAgeObject = ageObject => {
  if (ageObject.years >= 1) return { age: ageObject.years, ageUnit: 'Y' };
  if (ageObject.months >= 1) return { age: ageObject.months, ageUnit: 'M' };
  if (ageObject.weeks >= 1) return { age: ageObject.weeks, ageUnit: 'W' };
  if (ageObject.days >= 1) return { age: ageObject.days, ageUnit: 'D' };
  else return { age: ageObject.hours, ageUnit: 'H' };
};

export const getAgeByDate = date => {
  try {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getFilterField = option => {
  for (const [key, value] of Object.entries(option)) {
    if (typeof value === 'string' && !_.isEmpty(value)) {
      return { key, value };
      break;
    }
  }
};
