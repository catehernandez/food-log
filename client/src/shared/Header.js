import React from 'react';
import styled from 'styled-components';

import LogoutButton from 'session/LogoutButton';
import { ReactComponent as UserIcon } from 'user/user-icon.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const UserIconContainer = styled.span`
  cursor: pointer;
  margin: 0 1.2rem;
`;

const showUserProfile = () => {
  console.log('user profile');
};

const Header = () => {
  return (
    <HeaderContainer>
      <UserIconContainer onClick={showUserProfile}>
        <UserIcon />
      </UserIconContainer>
      <LogoutButton />
    </HeaderContainer>
  );
};

export default Header;
