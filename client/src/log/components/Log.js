import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'shared/Box';
import { ServingsLabel, ServingsWrapper } from './Servings';

const LogBox = styled(Box)`
  left: 50%;
  top: 15%;
  transform: translate(-50%, 15%);
  width: 340px;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    top: 17%;
    transform: translate(-50%, 17%);
    width: 400px;
  }
`;

const LogDate = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBeige};
  border-radius: 12px 12px 0px 0px;
  font-size: 1.25rem;
  padding: 0.9rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: 1.125rem;
  }
`;

const ServingsContainer = styled.div`
  display: grid;
  font-size: 1.125rem;
  gap: 1.25rem 0.75rem;
  grid-template-columns: repeat(2, auto);
  max-height: 230px;
  margin: 2.25rem auto;
  padding: 0 1.5rem;
  overflow-y: auto;
  width: max-content;

  ${ServingsLabel} {
    grid-column: 1 / 2;
  }

  ${ServingsWrapper} {
    grid-column: 3 / 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    gap: 1.5rem 1rem;
    font-size: 1rem;
    margin: 2.5rem auto 2rem;
  }
`;

const Log = (props) => {
  return (
    <LogBox>
      <LogDate>{props.date}</LogDate>
      <ServingsContainer>{props.children}</ServingsContainer>
    </LogBox>
  );
};

Log.propTypes = {
  /** The log's date */
  date: PropTypes.string.isRequired,
};

export default Log;
