import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ErrorMessage from 'shared/ErrorMessage';
import LoginBox from 'session/styles/LoginBox';
import LoginForm from 'session/LoginForm';
import UnstyledLink from 'shared/UnstyledLink';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors,
});

const Login = (props) => {
  const { from } = props.location.state || { from: { pathname: '/' } };

  if (props.currentUser) {
    return <Redirect to={from} />;
  }

  return (
    <LoginBox>
      <LoginForm />
      {props.errors === 401 ? (
        <ErrorMessage>Invalid username or password</ErrorMessage>
      ) : props.errors === 429 ? (
        <ErrorMessage>
          Too many failed login attempts. Please wait before trying again.
        </ErrorMessage>
      ) : (
        ''
      )}
      <div>
        Don't have an account?{' '}
        <UnstyledLink to={'/signup'}>
          <u>Sign up</u>
        </UnstyledLink>
      </div>
    </LoginBox>
  );
};

export default connect(mapStateToProps)(Login);
