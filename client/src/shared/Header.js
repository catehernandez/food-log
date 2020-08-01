import React from 'react';
import styled from 'styled-components';

import LogoutButton from 'session/LogoutButton';
import { ReactComponent as UserIcon } from 'userProfile/user-icon.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <UserIcon />
      <LogoutButton />
    </HeaderContainer>
  );
};

export default Header;
