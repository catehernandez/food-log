import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import UnstyledLink from './UnstyledLink';
import { ReactComponent as UserIconSVG } from 'user/user-icon.svg';
import { ReactComponent as CalendarIconSVG } from './SVG/calendar.svg';

const HeaderIconStyles = css`
  cursor: pointer;
  height: 32px;
  padding: 0 1rem;
  position: absolute;
  right: 1.5rem;
  stroke-width: 1.5px;
`;

const CalendarIcon = styled(CalendarIconSVG)`
  ${HeaderIconStyles}
`;

const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  position: absolute;
  top: 2.5rem;
  width: 100vw;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 0 0.5rem;
  position: absolute;
  left: 1.5rem;
`;

const UserIcon = styled(UserIconSVG)`
  ${HeaderIconStyles}
`;

/**
 * Header appears on dashboard for authenticated user. Contains buttons to reveal
 * UserProfile and Logout.
 */
const Header = (props) => {
  return (
    <HeaderContainer>
      <Title>
        <UnstyledLink to="/">Intueat</UnstyledLink>
      </Title>
      <UnstyledLink to="/archive">
        <CalendarIcon />
      </UnstyledLink>
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
