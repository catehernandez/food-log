import styled from 'styled-components';

const UserProfileContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  /* On landscape mobile devices */
  @media (min-width: ${({ theme }) =>
      theme.breakpoints.small}) and (max-width: ${({ theme }) =>
      theme.breakpoints.medium}) {
    padding-top: 20%;
  }
`;

export default UserProfileContainer;
