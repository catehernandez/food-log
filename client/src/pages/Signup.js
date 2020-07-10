import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div>
      <div>Sign up</div>
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
