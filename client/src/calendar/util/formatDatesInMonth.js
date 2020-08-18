import React from 'react';
import moment from 'moment';

import CurrentDateMarker from '../components/CurrentDateMarker';
import DateCell from '../components/DateCell';

/**
 * Generates the dates in the given calendar month. Adds special style to the
 * current day if it is within the month.
 *
 * @param {Object}  month   A moment() object
 *
 * @return {Element[]}      an array of <DateCell>'s.
 */
const formatDatesInMonth = (month) => {
  let dates = [];
  const isCurrentMonth = moment().isSame(month, 'month');
  const today = new Date().getDate();

  for (let date = 1; date <= month.daysInMonth(); date++) {
    if (isCurrentMonth && date === today) {
      dates.push(
        <DateCell key={date}>
          <CurrentDateMarker>{date}</CurrentDateMarker>
        </DateCell>
      );
    }
    //is not current date
    else {
      dates.push(<DateCell key={date}>{date}</DateCell>);
    }
  }

  return dates;
};

export default formatDatesInMonth;
