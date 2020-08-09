import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as UserIconSVG } from 'user/user-icon.svg';

const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  position: absolute;
  top: 2.5rem;
  width: 100vw;
`;

const UserIcon = styled(UserIconSVG)`
  cursor: pointer;
  padding: 0 1rem;
  position: absolute;
  right: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 0 0.5rem;
  position: absolute;
  left: 1.5rem;
`;

/**
 * Header appears on dashboard for authenticated user. Contains buttons to reveal
 * UserProfile and Logout.
 */
const Header = (props) => {
  return (
    <HeaderContainer>
      <Title>Intueat</Title>
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
