import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignupForm from 'components/SignupForm';

const SignupContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 30%);
  width: 30vw;
`;

const Signup = () => {
  return (
    <SignupContainer>
      <SignupForm />
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </SignupContainer>
  );
};

export default Signup;
