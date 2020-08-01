import React from 'react';
import styled from 'styled-components';

const UserProfilePanel = styled.div`
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  float: right;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 320px;
  }
`;

const UserProfileContainer = styled.div`
  display: grid;
`;

/**
 * Functional component that renders current user's profile in a popout panel.
 */
const UserProfile = () => {
  return (
    <UserProfilePanel>
      <UserProfileContainer>UserProfile</UserProfileContainer>
    </UserProfilePanel>
  );
};

export default UserProfile;
