import dayjs from 'dayjs';
export const getAgeAndAgeUnit = ageObject => {
  if (ageObject.years > 0) {
    return {age: ageObject.years, ageUnit: 'year'};
  } else if (ageObject.months > 0) {
    return {age: ageObject.months, ageUnit: 'month'};
  } else if (ageObject.weeks > 0) {
    return {age: ageObject.weeks, ageUnit: 'week'};
  } else {
    return {age: ageObject.days, ageUnit: 'day'};
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
  return {years, months, weeks, days, hours};
};

export const getAgeByAgeObject = ageObject => {
  if (ageObject.years >= 1) return {age: ageObject.years, ageUnit: 'year'};
  if (ageObject.months >= 1) return {age: ageObject.months, ageUnit: 'month'};
  if (ageObject.weeks >= 1) return {age: ageObject.weeks, ageUnit: 'week'};
  if (ageObject.days >= 1) return {age: ageObject.days, ageUnit: 'day'};
  else return {age: ageObject.hours, ageUnit: 'hour'};
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
    alert(error.message);
  }
};

export const dateAvailableUnits = (unit: string) => {
  switch (unit) {
    case 'Y':
      return 'year';
    case 'M':
      return 'month';
    case 'W':
      return 'week';
    case 'D':
      return 'day';
    default:
      return 'hour';
  }
};
