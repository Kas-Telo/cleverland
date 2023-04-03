import { createDate } from './create-date';
import { getMonthNumberOfDays } from './get-month-number-of-days';
import { getWeekNumber } from './get-week-number';

export const checkDateIsEqual = (date1: Date, date2: Date, type?: 'tomorrow' | 'next-monday') => {
  if (type === 'tomorrow') {
    if (
      date1.getDate() === date2.getDate() - 1 &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    ) {
      return true;
    }

    return (
      getMonthNumberOfDays(date1.getMonth(), date1.getFullYear()) === date1.getDate() &&
      date2.getDate() === 1 &&
      (date1.getMonth() === date2.getMonth() - 1 ||
        (date1.getMonth() === 11 && date2.getMonth() === 0 && date2.getFullYear() - 1 === date1.getFullYear()))
    );
  }
  if (type === 'next-monday') {
    return (
      createDate({ date: date2 }).dayNumberInWeek === 2 &&
      (getWeekNumber(date2) - 1 === getWeekNumber(date1) || getWeekNumber(date1) - getWeekNumber(date2) === 51) &&
      ((date2.getDate() - 3 > -3 && date2.getDate() - 3 < 1) ||
        date2.getDate() - 1 === date1.getDate() ||
        date2.getDate() - 2 === date1.getDate() ||
        (date2.getDate() - 3 === date1.getDate() && date1.getFullYear() === date2.getFullYear()))
    );
  }

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
