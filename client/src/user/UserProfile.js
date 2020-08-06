import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import Button from 'shared/Button';
import NumericInput from 'shared/NumericInput';
import * as sessionActions from 'session/sessionRedux';

const UserProfilePanel = styled.div`
  align-items: center;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  float: right;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 320px;
  }
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
 * Functional component that renders current user's profile in a popout panel.
 */
const UserProfile = (props) => {
  //if currentUser not yet loaded
  if (!props.currentUser) return <div />;

  const user = props.currentUser;

  return (
    <UserProfilePanel>
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

export default connect(mapStateToProps, sessionActions)(UserProfile);
