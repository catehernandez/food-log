import React from 'react';
import styled from 'styled-components';

import SiteTitle from 'header/SiteTitle';
import PastLogsCalendar from 'calendar/App';

const PastLogsHeader = styled.header`
  margin: 0.5rem auto;
  width: min-content;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    margin: 1.75rem auto;
  }
`;

const PastLogs = () => {
  return (
    <React.Fragment>
      <PastLogsHeader>
        <SiteTitle />
      </PastLogsHeader>

      <PastLogsCalendar />
    </React.Fragment>
  );
};

export default PastLogs;
