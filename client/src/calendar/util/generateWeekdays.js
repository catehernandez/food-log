import React from 'react';
import moment from 'moment';

import CalendarHeaderCell from '../components/CalendarHeaderCell';

/**
 * Generate styled calendar header.
 */
const generateWeekdays = () => {
  const weekdayshort = moment.weekdaysShort();

  const weekdays = weekdayshort.map((day) => (
    <CalendarHeaderCell key={day}>{day}</CalendarHeaderCell>
  ));

  return (
    <thead>
      <tr>{weekdays}</tr>
    </thead>
  );
};

export default generateWeekdays;
