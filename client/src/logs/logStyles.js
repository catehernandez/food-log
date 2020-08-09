import styled from 'styled-components';

import Box from 'shared/Box';
import { ServingsLabel, ServingsContainer } from './Servings';

export const DateContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBeige};
  border-radius: 12px 12px 0px 0px;
  font-size: 1.125rem;
  padding: 0.9rem;
  text-align: center;
`;

export const LogBox = styled(Box)`
  left: 50%;
  top: 17%;
  transform: translate(-50%, 17%);
  width: 340px;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    width: 400px;
  }
`;

export const LogContainer = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
  max-height: 230px;
  margin: 2.25rem auto;
  padding: 0 1.5rem;
  overflow-y: auto;
  width: max-content;

  ${ServingsLabel} {
    grid-column: 1 / 2;
  }

  ${ServingsContainer} {
    grid-column: 3 / 4;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin: 2.5rem auto 2rem;
  }
`;
