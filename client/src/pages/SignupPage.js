import React from 'react';
import { Link } from 'react-router-dom';

import LoginBox from 'session/styles/LoginBox';
import SignupForm from 'session/SignupForm';

const Signup = () => {
  return (
    <LoginBox>
      <SignupForm />
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </LoginBox>
  );
};

export default Signup;
