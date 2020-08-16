import styled from 'styled-components';

const DateCell = styled.td`
  text-align: center;
  height: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: 1.3rem;
    height: 5.5rem;
  }
`;

export default DateCell;
