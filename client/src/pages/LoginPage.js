import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import AuthErrorMessage from 'session/styles/AuthErrorMessage';
import LoginBox from 'session/styles/LoginBox';
import LoginForm from 'session/LoginForm';

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
        <AuthErrorMessage>Invalid username or password</AuthErrorMessage>
      ) : (
        ''
      )}
      <div>
        Don't have an account? <Link to={'/signup'}>Sign up</Link>
      </div>
    </LoginBox>
  );
};

export default connect(mapStateToProps)(Login);
