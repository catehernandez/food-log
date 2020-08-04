import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginBox from 'session/styles/LoginBox';
import SignupForm from 'session/SignupForm';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

const Signup = (props) => {
  if (props.currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <LoginBox>
      <SignupForm />
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </LoginBox>
  );
};

export default connect(mapStateToProps)(Signup);
