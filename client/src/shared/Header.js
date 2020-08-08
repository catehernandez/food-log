import React from 'react';
import styled from 'styled-components';

import LogoutButton from 'session/LogoutButton';
import { ReactComponent as UserIconSVG } from 'user/user-icon.svg';

const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`;

const UserIcon = styled(UserIconSVG)`
  cursor: pointer;
  padding: 0 1.2rem;
`;

const Header = (props) => {
  return (
    <HeaderContainer>
      <UserIcon onClick={props.toggleUserProfile} />
      <LogoutButton />
    </HeaderContainer>
  );
};

export default Header;
