import { checkDateIsEqual } from './check-date-is-equal';

export const checkOfTheDay = (date: Date, type?: 'tomorrow' | 'next-monday') => {
  const today = new Date();

  return checkDateIsEqual(today, date, type);
};
