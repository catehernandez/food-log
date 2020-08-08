import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Log from 'logs/Log';
import Header from 'shared/Header';
import UserProfile from 'user/UserProfile';

const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser };
};

const DashboardPage = (props) => {
  const [userProfileIsHidden, setUserProfileIsHidden] = useState(true);

  function showUserProfile() {
    setUserProfileIsHidden(false);
  }

  function hideUserProfile() {
    setUserProfileIsHidden(true);
  }

  if (!props.currentUser) return <Redirect to="/login" />;

  return (
    <React.Fragment>
      <UserProfile
        isHidden={userProfileIsHidden}
        toggleUserProfile={hideUserProfile}
      />
      <Header toggleUserProfile={showUserProfile} />
      <Log />
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(DashboardPage);
