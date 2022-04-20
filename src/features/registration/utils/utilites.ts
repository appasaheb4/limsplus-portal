export const getAgeAndAgeUnit = ageObject => {
  if (ageObject.years > 0) {
    return {age: ageObject.years, ageUnit: 'Y'};
  } else if (ageObject.months > 0) {
    return {age: ageObject.months, ageUnit: 'M'};
  } else if (ageObject.weeks > 0) {
    return {age: ageObject.weeks, ageUnit: 'W'};
  } else {
    return {age: ageObject.days, ageUnit: 'D'};
  }
};
