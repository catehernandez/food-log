import React from 'react';
import { connect } from 'react-redux';

import * as sessionActions from 'session/sessionRedux';
import Button from 'shared/Button';

const LogoutButton = (props) => {
  const logout = () => {
    props.logout();
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default connect(null, sessionActions)(LogoutButton);
