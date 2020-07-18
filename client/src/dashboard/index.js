import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; //redux related
import * as sessionActions from 'session/sessionRedux';
import styled from 'styled-components';

import Log from 'logs/Log';

const LogContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 30%);
`;

const mapStateToProps = (state) => {
  console.log('redux state', state);
  return { currentUser: state.session.currentUser };
};

const Dashboard = (props) => {
  if (!props.currentUser) return <Redirect to="/login" />;

  const logout = () => {
    props.logout();
  };

  return (
    <LogContainer>
      <Log />
      <button onClick={logout}>Logout</button>
    </LogContainer>
  );
};

export default connect(mapStateToProps, sessionActions)(Dashboard);
