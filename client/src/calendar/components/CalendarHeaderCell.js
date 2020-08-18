import styled from 'styled-components';

const CalendarHeaderCell = styled.th`
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkBrown30};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: lowercase;
  height: 3rem;
`;

export default CalendarHeaderCell;
