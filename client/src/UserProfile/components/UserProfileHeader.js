import styled from 'styled-components';

const UserProfileHeader = styled.header`
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  position: absolute;
  left: 1.5rem;
  position: absolute;
  right: 1.5rem;
  top: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    left: 2.25rem;
    position: absolute;
    right: 2.25rem;
    top: 1.75rem;
  }
`;

export default UserProfileHeader;
