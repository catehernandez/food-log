import React from 'react';
import { Link } from 'react-router-dom';

import SignupForm from 'session/SignupForm';

const Signup = () => {
  return (
    <React.Fragment>
      <SignupForm />
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </React.Fragment>
  );
};

export default Signup;
