import React from 'react';
import { connect } from 'react-redux';

import * as sessionActions from 'session/sessionRedux';

const Dashboard = (props) => {
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

export default connect(null, sessionActions)(Dashboard);
