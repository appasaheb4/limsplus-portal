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
