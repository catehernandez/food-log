import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import CalendarBorder from './components/CalendarBorder';
import createCalendarHeader from './util/createCalendarHeader';
import formatCalendarWeeks from './util/formatCalendarWeeks';
import formatDatesInMonth from './util/formatDatesInMonth';

/**
 * Coordinates other function calls to populate and format the body of the calendar.
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
  let dates = formatDatesInMonth(month, logEvents);
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
