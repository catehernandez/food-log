import styled from 'styled-components';

const CalendarBorder = styled.table`
  border-spacing: 0px;
  table-layout: fixed;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    border: 1px solid ${({ theme }) => theme.colors.darkBrown30};
    border-radius: 10px;
    margin: 0 auto;
    width: 70%;

    & thead tr th:first-child {
      border-top-left-radius: 10px;
    }

    & thead tr th:last-child {
      border-top-right-radius: 10px;
    }
  }
`;

export default CalendarBorder;
