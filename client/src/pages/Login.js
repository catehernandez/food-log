import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from 'components/LoginForm';

const LoginContainer = styled.div``;

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
