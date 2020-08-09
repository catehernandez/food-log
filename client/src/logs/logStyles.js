import styled from 'styled-components';

import Box from 'shared/Box';

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

export const ServingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, fit-content(1.5rem));
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 0.5rem;
`;

export const ServingsLabel = styled.span`
  text-align: right;
`;

export const LogContainer = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
  max-height: 230px;
  margin: 2.25rem auto;
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
