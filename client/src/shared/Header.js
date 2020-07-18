import React from 'react';
import styled from 'styled-components';

import LogoutButton from 'session/LogoutButton';

const HeaderContainer = styled.header`
  float: right;
  padding: 1.5rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoutButton />
    </HeaderContainer>
  );
};

export default Header;
