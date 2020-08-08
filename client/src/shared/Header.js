import React, { useState } from 'react';
import styled from 'styled-components';

import LogoutButton from 'session/LogoutButton';
import { ReactComponent as UserIcon } from 'user/user-icon.svg';
import UserProfile from 'user/UserProfile';

const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`;

const UserIconContainer = styled.span`
  cursor: pointer;
  margin: 0 1.2rem;
`;

const Header = () => {
  const [userProfileIsHidden, toggleUserProfile] = useState(true);

  return (
    <React.Fragment>
      <UserProfile hide={userProfileIsHidden} />
      <HeaderContainer>
        <UserIconContainer onClick={() => toggleUserProfile(false)}>
          <UserIcon />
        </UserIconContainer>
        <LogoutButton />
      </HeaderContainer>
    </React.Fragment>
  );
};

export default Header;
