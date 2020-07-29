import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';

import CenteredBox from 'shared/CenteredBox';
import LoginForm from 'session/LoginForm';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

const Login = (props) => {
  if (props.currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <CenteredBox>
      <LoginForm />
      <div>
        Don't have an account? <Link to={'/signup'}>Sign up</Link>
      </div>
    </CenteredBox>
  );
};

export default connect(mapStateToProps)(Login);
