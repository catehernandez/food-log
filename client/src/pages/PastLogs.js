import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled, { css } from 'styled-components';

import Calendar from 'calendar/App';
import LogErrMsg from 'log/LogErrMsg';
import SiteTitle from 'header/SiteTitle';
import { ReactComponent as RightArrowSVG } from 'shared/SVG/right-arrow.svg';
import { ReactComponent as LeftArrowSVG } from 'shared/SVG/left-arrow.svg';

const PastLogsHeader = styled.header`
  margin: 0.5rem auto;
  width: min-content;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    margin: 1.75rem auto;
  }
`;

/** styles for month & arrows to toggle month */
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
  font-size: 1.5rem;
  padding: 0 0.3rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

//for arrows to toggle month
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

  if (isError) {
    return <LogErrMsg />;
  }

  return (
    <React.Fragment>
      <PastLogsHeader>
        <SiteTitle />
      </PastLogsHeader>

      <MonthContainer>
        <Month>{currentMonth.format('MMMM YYYY')}</Month>
        <span>
          <LeftArrowIcon
            onClick={() => setMonth(moment(currentMonth).subtract(1, 'month'))}
          />
          <RightArrowIcon
            onClick={() => setMonth(moment(currentMonth).add(1, 'month'))}
          />
        </span>
      </MonthContainer>
      <Calendar month={currentMonth} logs={pastLogs} />
    </React.Fragment>
  );
};

export default PastLogs;
