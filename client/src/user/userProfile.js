import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const UserProfilePanel = styled.div`
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  float: right;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 320px;
  }
`;

const UserProfileContainer = styled.div`
  display: grid;
`;

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

/**
 * Functional component that renders current user's profile in a popout panel.
 */
const UserProfile = (props) => {
  //if currentUser not yet loaded
  if (!props.currentUser) return <div />;

  const user = props.currentUser;

  return (
    <UserProfilePanel>
      <UserProfileContainer>
        <div>Email: {user.email}</div>
        <div>Goals</div>
        <div>Vegetables: {user.vegetable_goals}</div>
        <div>Fruits: {user.fruit_goals}</div>
        <div>Protein: {user.protein_goals}</div>
        <div>Grains: {user.grain_goals}</div>
      </UserProfileContainer>
    </UserProfilePanel>
  );
};

export default connect(mapStateToProps)(UserProfile);
