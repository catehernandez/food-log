import styled from 'styled-components';

export const DateContainer = styled.div`
  background-color: #c4c4c4;
  border-radius: 12px 12px 0px 0px;
  font-size: 1.125rem;
  padding: 0.9rem;
  text-align: center;
`;

export const ServingsLabel = styled.span`
  text-align: right;
`;

export const ServingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, fit-content(1.5rem));
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 0.5rem;
`;

export const LogContainer = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
  margin: 2.25rem auto;
  width: max-content;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    margin: 3rem auto;
  }

  ${ServingsLabel} {
    grid-column: 1 / 2;
  }

  ${ServingsContainer} {
    grid-column: 3 / 4;
  }
`;
