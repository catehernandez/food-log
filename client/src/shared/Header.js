import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import UnstyledLink from './UnstyledLink';
import { ReactComponent as UserIconSVG } from 'user/user-icon.svg';
import { ReactComponent as CalendarIconSVG } from './SVG/calendar.svg';

const HeaderContainer = styled.header`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  left: 1.25rem;
  position: absolute;
  right: 1.25rem;
  top: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    left: 1.75rem;
    right: 1.75rem;
    top: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

//Icons & styles
const HeaderIconContainer = styled.span`
  display: flex;
  column-gap: 1.5rem;
`;

const HeaderIconStyles = css`
  cursor: pointer;
  height: 2.125rem;
  stroke-width: 1.5px;
`;

const CalendarIcon = styled(CalendarIconSVG)`
  ${HeaderIconStyles}
`;

const UserIcon = styled(UserIconSVG)`
  ${HeaderIconStyles}
`;

/**
 * Header appears on dashboard for authenticated user. Contains button to reveal
 * UserProfile and Logout.
 */
const Header = (props) => {
  return (
    <HeaderContainer>
      <Title>
        <UnstyledLink to="/">Intueat</UnstyledLink>
      </Title>

      <HeaderIconContainer>
        <UnstyledLink to="/archive">
          <CalendarIcon />
        </UnstyledLink>

        <UserIcon onClick={props.toggleUserProfile} />
      </HeaderIconContainer>
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
