import styled from 'styled-components';

const CurrentDateMarker = styled.span`
  color: ${({ theme }) => theme.colors.darkBrown};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.darkBeige};
  border-radius: 100%;
  margin: auto;
  width: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 3.25rem;
    width: 3.25rem;
  }
`;

export default CurrentDateMarker;
