import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** Calendar styles */
const CalendarBorder = styled.table`
  border-spacing: 0px;
  table-layout: fixed;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    border: 1px solid ${({ theme }) => theme.colors.darkBrown30};
    border-radius: 10px;
    margin: 0 auto;
    width: 70%;

    & thead tr th:first-child {
      border-top-left-radius: 10px;
    }

    & thead tr th:last-child {
      border-top-right-radius: 10px;
    }
  }
`;

const DateCell = styled.td`
  text-align: center;
  height: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: 1.3rem;
    height: 5.5rem;
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

const WeekDay = styled.th`
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBrown30};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: lowercase;
  height: 3rem;
`;

/**
 * Generate styled calendar header with weekdays.
 */
const createCalendarHeader = () => {
  const weekdayshort = moment.weekdaysShort();

  const weekdays = weekdayshort.map((day) => (
    <WeekDay key={day}>{day}</WeekDay>
  ));

  return (
    <thead>
      <tr>{weekdays}</tr>
    </thead>
  );
};

/**
 * Generates the dates in the given calendar month. Adds special style to the
 * current day if it is within the month.
 *
 * @param {Object}      month         A moment() object
 * @param {Object[]}    logEvents     An array of log objects in the given month.
 *
 * @return {Element[]}  an array of <DateCell>'s.
 */
const createDatesForMonth = (month, logEvents) => {
  let dates = [];
  const isCurrentMonth = moment().isSame(month, 'month');
  const today = parseInt(moment().format('D'));

  if (logEvents.length === 0) {
    for (let date = 1; date <= month.daysInMonth(); date++) {
      dates.push(<DateCell key={date}>{date}</DateCell>);
    }

    return dates;
  }

  //else logEvents is not empty

  //i tracks index on logEvents array
  let i = 0;
  let logDate = new Date(logEvents[i].log_date).getDate();

  console.log(logDate);

  for (let date = 1; date <= month.daysInMonth(); date++) {
    if (isCurrentMonth && date === today) {
      dates.push(
        <DateCell key={date}>
          <TodayMarker>{date}</TodayMarker>
        </DateCell>
      );
    }
    //is not today and there is no log for the day
    else {
      dates.push(<DateCell key={date}>{date}</DateCell>);
    }
  }

  return dates;
};

/**
 * Takes all <DateCell />s including reserved blank spaces and formats them
 * into 7 day weeks.
 *
 * @param {Element[]} totalCells  All cells in calendar month including empty days.
 */
const formatCalendarWeeks = (totalCells) => {
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

/**
 * Populates and formats the body of the calendar.
 *
 * @param {string}     month    The current month to be displayed
 * @param {Object[]}   logs     An array of log objects for the given month.
 */
const createCalendarBody = (month, logEvents) => {
  //determine blank days needded for formatting
  let firstWeekDay = moment(month).startOf('month').format('d');

  //Create blank cells at beginning of month for formatting
  let blanks = [];
  for (let i = 0; i < firstWeekDay; i++) {
    blanks.push(<td key={`blank${i}`}>{''}</td>);
  }

  //format actual dates
  let dates = createDatesForMonth(month, logEvents);
  let totalCells = [...blanks, ...dates];

  const weeksOfMonth = formatCalendarWeeks(totalCells);

  return <tbody>{weeksOfMonth}</tbody>;
};

/**
 * Creates a calendar for the given month and populates with pastLog events, if given.
 */
const Calendar = ({ month, logs }) => {
  const calendarHeader = createCalendarHeader();
  const calendarCells = createCalendarBody(month, logs);

  return (
    <React.Fragment>
      <CalendarBorder>
        {calendarHeader}
        {calendarCells}
      </CalendarBorder>
    </React.Fragment>
  );
};

Calendar.propTypes = {
  /** A moment() object */
  month: PropTypes.object.isRequired,
  /** An array of log objects */
  pastLogs: PropTypes.array,
};

export default Calendar;
