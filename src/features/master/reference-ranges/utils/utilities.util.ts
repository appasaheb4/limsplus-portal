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
    const ageFromDays =
      ageFromUnit?.toLocaleLowerCase() != 'w'
        ? dayjs()
            .add(Number.parseInt(ageFrom), getUnit(ageFromUnit))
            .diff(dayjs(), 'day')
        : dayjs().add(7, 'day').diff(dayjs(), 'day') * Number.parseInt(ageFrom);
    const ageToDays =
      ageToUnit?.toLocaleLowerCase() != 'w'
        ? dayjs()
            .add(Number.parseInt(ageTo), getUnit(ageToUnit))
            .diff(dayjs(), 'day')
        : dayjs().add(7, 'day').diff(dayjs(), 'day') * Number.parseInt(ageTo);
    if (ageFromDays > ageToDays) {
      alert('Please enter correct value');
      return;
    }
    return ageToDays - ageFromDays;
  } else return 1;
};
