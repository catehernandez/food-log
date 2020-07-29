import React from 'react';
import { Link } from 'react-router-dom';

import CenteredBox from 'shared/CenteredBox';
import SignupForm from 'session/SignupForm';

const Signup = () => {
  return (
    <CenteredBox>
      <SignupForm />
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </CenteredBox>
  );
};

export default Signup;
