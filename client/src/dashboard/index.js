import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; //redux related
import * as sessionActions from 'session/sessionRedux';

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
    <React.Fragment>
      <div>Dashboard</div>
      <button onClick={logout}>Logout</button>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, sessionActions)(Dashboard);
