import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled, { css } from 'styled-components';

import Calendar from 'pastLogs/Calendar';
import LogErrMsg from 'logs/LogErrMsg';
import { ReactComponent as RightArrowSVG } from 'shared/SVG/right-arrow.svg';
import { ReactComponent as LeftArrowSVG } from 'shared/SVG/left-arrow.svg';

/** Month & arrow styles */
const MonthContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 1rem auto;
  min-width: 375px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 70%;
  }
`;

const Month = styled.span`
  font-size: 1.75rem;
  padding: 0 0.3rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const arrowStyle = css`
  cursor: pointer;
  height: 1.2rem;
  padding: 0 0.5rem;
  stroke: ${({ theme }) => theme.colors.darkBrown};
  stroke-width: 3px;
`;

const LeftArrowIcon = styled(LeftArrowSVG)`
  ${arrowStyle}
`;

const RightArrowIcon = styled(RightArrowSVG)`
  ${arrowStyle}
`;

const getPastLogs = async (month, year) => {
  try {
    const res = await axios.get(`/user/logs/${year}/${month}`);

    return res.data;
  } catch {
    throw Error;
  }
};

const PastLogs = () => {
  const [currentMonth, setMonth] = useState(moment());
  const [isError, setIsError] = useState(false);
  const [pastLogs, setPastLogs] = useState([]);

  //get past logs
  useEffect(() => {
    const fetchPastLogs = async () => {
      const month = currentMonth.format('MM');
      const year = currentMonth.format('YYYY');

      try {
        const results = await getPastLogs(month, year);

        setPastLogs(results);
      } catch {
        setIsError(true);
      }
    };

    fetchPastLogs();
  }, [currentMonth]);

  console.log(pastLogs);

  if (isError) {
    return <LogErrMsg />;
  }

  return (
    <React.Fragment>
      <MonthContainer>
        <span>
          <LeftArrowIcon
            onClick={() => setMonth(moment(currentMonth).subtract(1, 'month'))}
          />
          <RightArrowIcon
            onClick={() => setMonth(moment(currentMonth).add(1, 'month'))}
          />
        </span>
        <Month>{currentMonth.format('MMMM YYYY')}</Month>
      </MonthContainer>
      <Calendar month={currentMonth} />
    </React.Fragment>
  );
};

export default PastLogs;
