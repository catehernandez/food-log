import React from 'react';

/**
 * Takes an array of <td> elements including <DateCell>'s and reserved blank
 * spaces and formats them into 7 day weeks.
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

export default formatCalendarWeeks;
