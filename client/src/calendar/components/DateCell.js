import styled from 'styled-components';

const DateCell = styled.td`
  color: ${({ theme }) => theme.colors.darkBrown60};
  font-size: 1.125rem;
  height: 3rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    font-size: 1.375;
    height: 5.5rem;
  }
`;

export default DateCell;
