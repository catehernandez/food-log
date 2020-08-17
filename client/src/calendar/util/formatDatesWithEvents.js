import React from 'react';
import moment from 'moment';

import CurrentDateMarker from '../components/CurrentDateMarker';
import DateCell from '../components/DateCell';
import LogDoughnut from 'pastLogs/LogDoughnut';

/**
 * Generates the dates in the given calendar month. Adds special style to the
 * current day if it is within the month.
 *
 * @param {Object}      month         A moment() object
 * @param {Object[]}    logEvents     An array of log objects in the given month.
 *
 * @return {Element[]}  an array of <DateCell>'s.
 */
const formatDatesWithEvents = (month, logEvents) => {
  let dates = [];
  const isCurrentMonth = moment().isSame(month, 'month');
  const today = new Date().getDate();

  let i = 0;
  let currentLog = logEvents[i];
  let currentLogDate = new Date(currentLog.log_date).getDate();

  for (let date = 1; date <= month.daysInMonth(); date++) {
    if (isCurrentMonth && date === today) {
      dates.push(
        <DateCell key={date}>
          <CurrentDateMarker>{date}</CurrentDateMarker>
        </DateCell>
      );
      i++;
    } else if (currentLogDate === date) {
      dates.push(
        <DateCell key={date}>
          <LogDoughnut log={currentLog} />
        </DateCell>
      );

      i++;
    }
    //is not current date && there is no log for current date
    else {
      dates.push(<DateCell key={date}>{date}</DateCell>);
    }

    //update logs index
    if (i < logEvents.length) {
      currentLog = logEvents[i];
      currentLogDate = new Date(currentLog.log_date).getDate();
    }
  }

  return dates;
};

export default formatDatesWithEvents;
