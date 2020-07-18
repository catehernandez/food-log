import React from 'react';
import { connect } from 'react-redux';

import * as sessionActions from 'session/sessionRedux';

const LogoutButton = (props) => {
  const logout = () => {
    props.logout();
  };

  return <button onClick={logout}>Logout</button>;
};

export default connect(null, sessionActions)(LogoutButton);
