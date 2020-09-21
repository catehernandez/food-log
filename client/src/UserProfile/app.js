import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'shared/Button';
import NumericInput from 'shared/NumericInput';
import { ReactComponent as CloseSVG } from 'shared/SVG/X.svg';
import * as sessionActions from 'session/sessionRedux';

const UserProfilePanel = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: absolute;
  transform: translateY(0%);
  transition: transform 300ms;
  width: 100%;

  ${(props) =>
    props.isHidden &&
    `
    transform: translateY(-100%);
  `}

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    right: 0;
    transform: translateX(0%);
    width: 320px;

    ${(props) =>
      props.isHidden &&
      `
      transform: translateX(100%);
    `}
  }
`;

/** Subheader specific to the user profile panel */
const UserProfileHeader = styled.header`
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  position: absolute;
  padding: 1.5rem;
  top: 0;
  width: 16.5rem;
`;

const CloseButton = styled(CloseSVG)`
  cursor: pointer;
  height: 20px;
  margin: 0.5rem;
`;

const LogoutButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.lightBeige};
  border: none;
  font-size: 1.1rem;
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-column-gap: 2.5rem;
  grid-row-gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  margin: 0.5rem auto;
`;

const SubmitButton = styled(Button)`
  margin: 2rem auto;
`;

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

/**
 * Functional component that allows a user to view and update their profile in
 * a popout panel.
 */
const UserProfile = (props) => {
  const user = props.currentUser;

  //if currentUser not yet loaded
  if (!user) return <div />;

  return (
    <UserProfilePanel isHidden={props.isHidden}>
      <UserProfileHeader>
        <CloseButton onClick={props.toggleUserProfile} />
        <LogoutButton onClick={props.logout}>Log out</LogoutButton>
      </UserProfileHeader>
      <h3>Goals</h3>
      <Formik
        initialValues={{
          vegetable_goals: user.vegetable_goals,
          fruit_goals: user.fruit_goals,
          protein_goals: user.protein_goals,
          grain_goals: user.grain_goals,
        }}
        onSubmit={(values) => props.updateUser(values)}
      >
        <Form>
          <GoalsGrid>
            <label htmlFor="vegetable_goals">Vegetables</label>
            <NumericInput name="vegetable_goals" />

            <label htmlFor="fruit_goals">Fruits</label>
            <NumericInput name="fruit_goals" />

            <label htmlFor="protein_goals">Protein</label>
            <NumericInput name="protein_goals" />

            <label htmlFor="grain_goals">Grains</label>
            <NumericInput name="grain_goals" />
          </GoalsGrid>

          <SubmitButton type="submit">Save changes</SubmitButton>
        </Form>
      </Formik>
    </UserProfilePanel>
  );
};

UserProfile.propTypes = {
  /** Object stored in redux state. Determines Formik initial values. */
  currentUser: PropTypes.shape({
    vegetable_goals: PropTypes.number.isRequired,
    fruit_goals: PropTypes.number.isRequired,
    protein_goals: PropTypes.number.isRequired,
    grain_goals: PropTypes.number.isRequired,
  }),
  /** Boolean passed by parent component to indicate UserProfile visibility. */
  isHidden: PropTypes.bool.isRequired,
  /**
   * Function passed by parent component to change UserProfile visibility. Gets
   * called when user clicks the X (close) icon.
   */
  toggleUserProfile: PropTypes.func.isRequired,
  /** Gets called when the user clicks the "Save Changes" button. */
  updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, sessionActions)(UserProfile);
