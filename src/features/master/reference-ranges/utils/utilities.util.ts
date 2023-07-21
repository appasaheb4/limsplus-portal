import dayjs from 'dayjs';

const getUnit = (unit: string) => {
  switch (unit.toLocaleLowerCase()) {
    case 'h':
      return 'hour';
    case 'd':
      return 'day';
    case 'm':
      return 'month';
    case 'y':
      return 'year';
    default:
      return 'day';
  }
};

export const getDays = (ageFrom, ageFromUnit, ageTo, ageToUnit) => {
  if (ageFrom && ageFromUnit && ageTo && ageToUnit) {
    const daysAgeFrom =
      ageFromUnit?.toLocaleLowerCase() != 'w'
        ? dayjs()
            .add(Number.parseInt(ageFrom), getUnit(ageFromUnit))
            .diff(dayjs(), 'day')
        : dayjs().add(7, 'day').diff(dayjs(), 'day') * Number.parseInt(ageFrom);
    const daysAgeTo =
      ageToUnit?.toLocaleLowerCase() != 'w'
        ? dayjs()
            .add(Number.parseInt(ageTo), getUnit(ageToUnit))
            .diff(dayjs(), 'day')
        : dayjs().add(7, 'day').diff(dayjs(), 'day') * Number.parseInt(ageTo);
    if (daysAgeFrom > daysAgeTo) {
      alert('Please enter correct value');
      return;
    }
    return {daysAgeFrom, daysAgeTo};
  } else return {daysAgeFrom: 1, daysAgeTo: 1};
};
