import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Log from 'logs/Log';
import LogoutButton from 'session/LogoutButton';

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

  return (
    <LogContainer>
      <Log />
      <LogoutButton />
    </LogContainer>
  );
};

export default connect(mapStateToProps)(Dashboard);
