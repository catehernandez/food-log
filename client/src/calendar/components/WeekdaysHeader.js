import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledHeaderCell = styled.th`
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBrown30};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: lowercase;
  height: 3rem;
`;

/**
 * Generate styled calendar header.
 */
const WeekdaysHeader = () => {
  const weekdayshort = moment.weekdaysShort();

  const weekdays = weekdayshort.map((day) => (
    <StyledHeaderCell key={day}>{day}</StyledHeaderCell>
  ));

  return (
    <thead>
      <tr>{weekdays}</tr>
    </thead>
  );
};

export default WeekdaysHeader;
