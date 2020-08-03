import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import Button from 'shared/Button';
import NumericInput from 'shared/NumericInput';

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
        <div>Goals</div>
        <Formik
          initialValues={{
            vegetable_goals: user.vegetable_goals,
            fruit_goals: user.fruit_goals,
            protein_goals: user.protein_goals,
            grain_goals: user.grain_goals,
          }}
          onSubmit={(values) => console.log(values)}
        >
          <Form>
            <label htmlFor="vegetable_goals">Vegetables</label>
            <NumericInput name="vegetable_goals" />

            <label htmlFor="fruit_goals">Fruits</label>
            <NumericInput name="fruit_goals" />

            <label htmlFor="protein_goals">Protein</label>
            <NumericInput name="protein_goals" />

            <label htmlFor="grain_goals">Grains</label>
            <NumericInput name="grain_goals" />

            <Button type="submit">Save changes</Button>
          </Form>
        </Formik>
      </UserProfileContainer>
    </UserProfilePanel>
  );
};

export default connect(mapStateToProps)(UserProfile);
