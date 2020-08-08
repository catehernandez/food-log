import React from 'react';
import PropTypes from 'prop-types';
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

/**
 * Header appears on dashboard for authenticated user. Contains buttons to reveal
 * UserProfile and Logout.
 *
 * Clicking the UserIcon reveals the UserProfile. Visibility of UserProfile is
 * determined in parent component's state and can be manipulated via the
 * toggleUserProfile function, which must be passed to the header as a prop.
 */
const Header = (props) => {
  return (
    <HeaderContainer>
      <UserIcon onClick={props.toggleUserProfile} />
      <LogoutButton />
    </HeaderContainer>
  );
};

Header.propTypes = {
  toggleUserProfile: PropTypes.func.isRequired,
};

export default Header;
