import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import Button from 'shared/Button';
import NumericInput from 'shared/NumericInput';
import { ReactComponent as CloseSVG } from 'shared/SVG/X.svg';
import * as sessionActions from 'session/sessionRedux';

/**
 * UserProfilePanel is shown by default but can be hidden by passing "hide" as props.
 */
const UserProfilePanel = styled.div`
  align-items: center;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: absolute;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    right: 0;
    transform: translateX(0%);
    transition: transform 300ms;
    width: 320px;

    ${(props) =>
      props.hide &&
      `
      transform: translateX(100%);
    `}
  }
`;

const CloseButton = styled(CloseSVG)`
  position: absolute;
  left: 1.5rem;
  margin: 0.5rem;
  top: 1.5rem;
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
 * Functional component that renders current user's profile in a popout panel
 * that can be shown or revealed by passing "hide" as a prop.
 */
const UserProfile = (props) => {
  const user = props.currentUser;

  //if currentUser not yet loaded
  if (!user) return <div />;

  return (
    <UserProfilePanel hide={props.hide}>
      <CloseButton />
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
