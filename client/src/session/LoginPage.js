import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';

import LoginForm from 'session/LoginForm';

const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 30%);
  width: 30vw;
`;

const mapStateToProps = (state) => {
  console.log('redux state', state);
  return { currentUser: state.auth.currentUser };
};

const Login = (props) => {
  if (props.currentUser != null) {
    return <Redirect to="/" />;
  }

  return (
    <LoginContainer>
      <LoginForm />
      <div>
        Don't have an account? <Link to={'/signup'}>Sign up</Link>
      </div>
    </LoginContainer>
  );
};

export default connect(mapStateToProps)(Login);
