import styled from 'styled-components';

const CurrentDateMarker = styled.span`
  color: ${({ theme }) => theme.colors.darkBrown};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.darkBeige};
  border-radius: 100%;
  margin: auto;
  width: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    height: 3.5rem;
    width: 3.5rem;
  }
`;

export default CurrentDateMarker;
