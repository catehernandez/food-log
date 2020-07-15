import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from 'session/LoginForm';

const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 30%);
  width: 30vw;
`;

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm />
      <div>
        Don't have an account? <Link to={'/signup'}>Sign up</Link>
      </div>
    </LoginContainer>
  );
};

export default Login;
