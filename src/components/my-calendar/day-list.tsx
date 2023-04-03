import { Fragment, memo } from 'react';

import { checkDateIsEqual, checkOfTheDay } from '../../common/utils/helpers/date';

import { ButtonDay, DayType } from './button-day/button-day';

type DayListProps = {
  calendarDays: DayType[];
  selectedDate: Date | null;
  selectedMonth: any;
  setSelectedDayCallback: (date: DayType) => void;
  selectDayCallback: (day: Date) => void;
};
export const DayList = memo(
  ({ selectDayCallback, selectedDate, selectedMonth, setSelectedDayCallback, calendarDays }: DayListProps) => (
    <Fragment>
      {calendarDays.map((day) => {
        const isToday = checkOfTheDay(day.date);
        const isTomorrow = checkOfTheDay(day.date, 'tomorrow');
        const isSelectedDay = selectedDate && checkDateIsEqual(selectedDate, day.date);
        const isAdditionalDay = day.monthIndex !== selectedMonth.monthIndex;
        const isWeekend = (day.dayNumberInWeek === 7 || day.dayNumberInWeek === 1) && !isAdditionalDay;
        const isNextMonday = checkOfTheDay(day.date, 'next-monday');

        return (
          <ButtonDay
            key={day.timestamp}
            setSelectedDay={setSelectedDayCallback}
            day={day}
            isSelectedDay={isSelectedDay}
            isTomorrow={isTomorrow}
            selectDate={selectDayCallback}
            isNextMonday={isNextMonday}
            isToday={isToday}
            isWeekend={isWeekend}
          />
        );
      })}
    </Fragment>
  )
);
