import React from 'react';
import styled from 'styled-components';

import LogoutButton from 'session/LogoutButton';
import { ReactComponent as UserIcon } from 'user/user-icon.svg';

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

const Header = (props) => {
  return (
    <HeaderContainer>
      <UserIconContainer onClick={props.toggleUserProfile}>
        <UserIcon />
      </UserIconContainer>
      <LogoutButton />
    </HeaderContainer>
  );
};

export default Header;
