import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ErrorMessage from 'shared/ErrorMessage';
import LoginBox from 'session/styles/LoginBox';
import SignupForm from 'session/SignupForm';
import UnstyledLink from 'shared/UnstyledLink';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors,
});

const Signup = (props) => {
  const { from } = props.location.state || { from: { pathname: '/' } };

  if (props.currentUser) {
    return <Redirect to={from} />;
  }

  return (
    <LoginBox>
      <SignupForm />
      {props.errors === 429 ? (
        <ErrorMessage>Too many accounts created.</ErrorMessage>
      ) : (
        ''
      )}
      <div>
        Already have an account?{' '}
        <UnstyledLink to="/login">
          <u>Log in</u>
        </UnstyledLink>
      </div>
    </LoginBox>
  );
};

export default connect(mapStateToProps)(Signup);
