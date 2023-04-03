import { ResponseCommentBookType } from '../../../api/books/books-api-types';

export const getFormattedDay = (date: string) => {
  const localDate = new Date(date);

  return `${localDate.getDate() < 10 ? `0${localDate.getDate()}` : localDate.getDate()}`;
};
export const getFormattedMonthNumber = (date: string) => {
  const localDate = new Date(date);

  return `${localDate.getMonth() < 9 ? `0${localDate.getMonth() + 1}` : localDate.getMonth() + 1}`;
};
export const getFullDate = (dateStr: string) => {
  const date = new Date(dateStr);
  let month = 'января';
  const fullDate = `${date.getDate()} ${month} ${date.getFullYear()}`;

  switch (date.getMonth()) {
    case 1:
      month = 'февраля';
      break;
    case 2:
      month = 'марта';
      break;
    case 3:
      month = 'апреля';
      break;
    case 4:
      month = 'мая';
      break;
    case 5:
      month = 'июня';
      break;
    case 6:
      month = 'июля';
      break;
    case 7:
      month = 'августа';
      break;
    case 8:
      month = 'сентября';
      break;
    case 9:
      month = 'октября';
      break;
    case 10:
      month = 'ноября';
      break;
    case 11:
      month = 'декабря';
      break;
    default:
      break;
  }

  return fullDate;
};
export const getDayDotMonth = (date: string) => {
  const day = getFormattedDay(date);
  const month = getFormattedMonthNumber(date);

  return `${day}.${month}`;
};
export const sortCommentsByDate = (comments: ResponseCommentBookType[]) => {
  const copyComments = [...comments];

  return copyComments.sort((a, b) => {
    const dateA = new Date(a.createdAt).valueOf();
    const dateB = new Date(b.createdAt).valueOf();

    return dateB - dateA;
  });
};
