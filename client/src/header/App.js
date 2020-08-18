import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SiteTitle from './SiteTitle';
import UnstyledLink from '../shared/UnstyledLink';
import { CalendarIcon, UserIcon } from './headerIcons';

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

const HeaderIconContainer = styled.span`
  display: flex;
  column-gap: 1.5rem;
`;

/**
 * Header appears on dashboard for authenticated user. Contains button to reveal
 * UserProfile and Logout.
 */
const Header = (props) => {
  return (
    <HeaderContainer>
      <SiteTitle />

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
