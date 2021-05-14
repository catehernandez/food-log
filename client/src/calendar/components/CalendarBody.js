import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import CalendarTable from './CalendarTable';
import WeekdaysHeader from 'calendar/components/WeekdaysHeader';
import formatCalendarWeeks from '../util/formatCalendarWeeks';
import formatDatesInMonth from '../util/formatDatesInMonth';
import formatDatesWithEvents from '../util/formatDatesWithEvents';

/**
 * Creates a calendar for the given month and populates with pastLog events, if given.
 */
const CalendarBody = ({ month, logs }) => {
  //Create blank cells at beginning of month for formatting
  const firstWeekDay = moment(month).startOf('month').format('d');
  let blanks = [];

  for (let i = 0; i < firstWeekDay; i++) {
    blanks.push(<td key={`blank${i}`}>{''}</td>);
  }

  //format actual dates
  const areLogsInMonth = logs.length > 0;
  const dates = areLogsInMonth
    ? formatDatesWithEvents(month, logs)
    : formatDatesInMonth(month);
  const totalCells = [...blanks, ...dates];

  const weeksOfMonth = formatCalendarWeeks(totalCells);

  return (
    <CalendarTable>
      <WeekdaysHeader />
      <tbody>{weeksOfMonth}</tbody>
    </CalendarTable>
  );
};

CalendarBody.propTypes = {
  /** A moment() object representing the month to be displayed */
  month: PropTypes.object.isRequired,
  /** An array of log objects for the given month */
  logs: PropTypes.array,
};

export default CalendarBody;
