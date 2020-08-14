import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

/** Calendar styles */
const CalendarBorder = styled.table`
  border-spacing: 0px;
  table-layout: fixed;
  width: 100%;

  & thead tr th:first-child {
    border-top-left-radius: 10px;
  }

  & thead tr th:last-child {
    border-top-right-radius: 10px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    border: 1px solid ${({ theme }) => theme.colors.darkBrown30};
    border-radius: 10px;
    width: 75%;
  }
`;

const WeekDay = styled.th`
  background-color: ${({ theme }) => theme.colors.lightBeige};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: lowercase;
  height: 3rem;
`;

const Date = styled.td`
  text-align: center;
  height: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    border-top: 1px solid ${({ theme }) => theme.colors.darkBrown30};
    font-size: 1.3rem;
    height: 5.5rem;

    & + td {
      border-left: 1px solid ${({ theme }) => theme.colors.darkBrown30};
    }
  }
`;

const TodayMarker = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.darkBeige};
  border-radius: 100%;
  margin: auto;
  width: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 3.5rem;
    width: 3.5rem;
  }
`;

const weekdays = () => {
  const weekdayshort = moment.weekdaysShort();

  const weekdayHeaders = weekdayshort.map((day) => (
    <WeekDay key={day}>{day}</WeekDay>
  ));

  return weekdayHeaders;
};

/**
 * Function to populate the number of days in current month in a calendar.
 * Also adds special style to currentDay if it is within the month.
 *
 * @param {moment()}    month
 * @return {Array}      days    an array of <Date> cells to go in calendar
 */
const getDatesInMonth = (month) => {
  let dates = [];
  const isCurrentMonth = moment().isSame(month, 'month');
  const today = moment().format('D');

  for (let date = 1; date <= month.daysInMonth(); date++) {
    //style current date. Use == to compare String and Number
    if (isCurrentMonth && date == today) {
      dates.push(
        <Date key={date}>
          <TodayMarker>{date}</TodayMarker>
        </Date>
      );
    }
    //no special styling for other dates
    else {
      dates.push(<Date key={date}>{date}</Date>);
    }
  }

  return dates;
};

/**
 *
 * @param {*} totalCells    All cells in calendar month including empty days.
 */
const formatWeeks = (totalCells) => {
  const DAYS_IN_WEEK = 7;
  const LAST_DAY_OF_WEEK = 6;
  const lastDayOfMonth = totalCells.length - 1;

  let allWeeks = [];
  let week = [];
  let weekNumber = 1;

  totalCells.forEach((cell, i) => {
    //last day of week or last day of month
    if (i % DAYS_IN_WEEK === LAST_DAY_OF_WEEK || i === lastDayOfMonth) {
      week.push(cell);
      allWeeks.push(<tr key={`week${weekNumber}`}>{week}</tr>);
      week = []; //reset current week
      weekNumber++;
    }
    //all other days in week
    else {
      week.push(cell);
    }
  });

  return allWeeks;
};

const formatCalendar = (month) => {
  //determine blank days needded for formatting
  let firstWeekDay = moment(month).startOf('month').format('d');

  let blanks = [];
  for (let i = 0; i < firstWeekDay; i++) {
    blanks.push(<td key={`blank${i}`}>{''}</td>);
  }

  //format actual dates
  let dates = getDatesInMonth(month);
  let totalCells = [...blanks, ...dates];

  const weeksOfMonth = formatWeeks(totalCells);

  return <tbody>{weeksOfMonth}</tbody>;
};

const Calendar = () => {
  //initialize with current month
  const [currentMonth, setMonth] = useState(moment());
  const calendarCells = formatCalendar(currentMonth);

  const days = weekdays();

  return (
    <CalendarBorder>
      <thead>
        <tr>{days}</tr>
      </thead>
      {calendarCells}
    </CalendarBorder>
  );
};

export default Calendar;
