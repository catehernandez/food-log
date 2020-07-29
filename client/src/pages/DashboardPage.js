import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Log from 'logs/Log';
import Header from 'shared/Header';

const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser };
};

const DashboardPage = (props) => {
  if (!props.currentUser) return <Redirect to="/login" />;

  return (
    <React.Fragment>
      <Header />
      <Log />
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(DashboardPage);
