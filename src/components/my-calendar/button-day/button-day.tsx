import { memo } from 'react';

import { Info } from '../../../ui/typography';

import style from '../my-calendar.module.css';

export type DayType = {
  date: Date;
  dayNumber: number;
  day: string;
  dayNumberInWeek: number;
  dayShort: string;
  year: number;
  yearShort: string;
  month: string;
  monthShort: string;
  monthNumber: number;
  monthIndex: number;
  timestamp: number;
  week: number;
};

type Props = {
  day: DayType;
  setSelectedDay: (date: DayType) => void;
  selectDate: (day: Date) => void;
  isSelectedDay: boolean | null;
  isToday: boolean;
  isNextMonday: boolean;
  isTomorrow: boolean;
  isWeekend: boolean;
};

export const ButtonDay = memo(
  ({ day, isSelectedDay, isToday, isNextMonday, isTomorrow, isWeekend, selectDate, setSelectedDay }: Props) => {
    const classButtonText = `${
      isToday && !isSelectedDay
        ? style.currentDay
        : (isTomorrow || isNextMonday) && !isSelectedDay && !isWeekend
        ? style.availableDay
        : isSelectedDay
        ? style.selectedDayText
        : ''
    }`;

    return (
      <button
        data-test-id='day-button'
        type='button'
        key={`${day.dayNumber}-${day.monthIndex}`}
        className={`${style.date}  ${isSelectedDay ? style.selectedDay : ''} ${isWeekend && style.weekendDay}`}
        onClick={() => {
          setSelectedDay(day);
          selectDate(day.date);
        }}
        disabled={isWeekend || !(isToday || isNextMonday || isTomorrow)}
      >
        <Info type='small' className={`${classButtonText} ${isWeekend && style.weekendDayText} ${style.dateText}`}>
          {day.dayNumber}
        </Info>
      </button>
    );
  }
);
