import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  padding: 0 1rem;
`;

/**
 * Header appears on dashboard for authenticated user. Contains buttons to reveal
 * UserProfile and Logout.
 */
const Header = (props) => {
  return (
    <HeaderContainer>
      <UserIcon onClick={props.toggleUserProfile} />
    </HeaderContainer>
  );
};

Header.propTypes = {
  /**
   * Function passed by parent component to change UserProfile visibility.
   * Gets called when user clicks the UserIcon.
   */
  toggleUserProfile: PropTypes.func.isRequired,
};

export default Header;
