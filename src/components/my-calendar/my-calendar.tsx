import { memo, useCallback, useState } from 'react';

import { useCalendar } from '../../common/hooks/use-calendar';
import { Icon } from '../../ui/icon/icon';
import { Info } from '../../ui/typography';

import { DayList } from './day-list';

import style from './my-calendar.module.css';

type Props = {
  selectDate: (date: Date) => void;
  selectedDate: Date | null;
};

export const MyCalendar = memo(({ selectDate, selectedDate }: Props) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const {
    state,
    functions: { setSelectedDayCallback, setSelectedMonthByIndex, onClickArrow },
  } = useCalendar({
    locale: 'ru',
    selectedDate: new Date(),
    firstWeekDayNumber: 2,
  });

  const selectDayCallback = useCallback(
    (date: Date) => {
      selectDate(date);
    },
    [selectDate]
  );

  return (
    <div data-test-id='calendar' className={style.container}>
      <div className={style.header}>
        <div className={style.headerContentContainer}>
          {isOpenSelect && (
            <div aria-hidden={true} onClick={() => setIsOpenSelect(false)} className={style.selectSubstrate} />
          )}
          <button
            data-test-id='month-select'
            type='button'
            onClick={() => setIsOpenSelect(!isOpenSelect)}
            className={style.selectWrapper}
          >
            <div className={style.select}>{`${state.selectedMonth.monthName} ${state.selectedMonth.year}`}</div>

            <Icon className={style.arrowDropDown} title='arrow-drop-down' />
            <ul className={`${style.listContainer} ${isOpenSelect && style.listContainerActive}`}>
              {state.monthesNames.map((month) => (
                <li
                  aria-hidden={true}
                  onClick={() => {
                    setSelectedMonthByIndex(month.monthIndex);
                    setIsOpenSelect(false);
                  }}
                  key={month.month}
                  className={style.item}
                >
                  {`${month.month} ${state.selectedMonth.year}`}
                </li>
              ))}
            </ul>
          </button>

          <div className={style.arrowsContainer}>
            <Icon dataTestId='button-prev-month' onClick={() => onClickArrow('down')} title='arrow-up' />
            <Icon dataTestId='button-next-month' onClick={() => onClickArrow('up')} title='arrow-down' />
          </div>
        </div>
      </div>
      <div className={style.dateContainer}>
        <div className={style.weekContainer}>
          {state.weekDaysNames.map((el) => (
            <div key={el.dayShort} className={style.date}>
              <Info className={style.dateWeek} type='large'>
                {el.dayShort}
              </Info>
            </div>
          ))}
        </div>
        <div className={style.daysContainer}>
          <DayList
            calendarDays={state.calendarDays}
            selectedDate={selectedDate}
            selectedMonth={state.selectedMonth}
            setSelectedDayCallback={setSelectedDayCallback}
            selectDayCallback={selectDayCallback}
          />
        </div>
      </div>
    </div>
  );
});
