import React, { useState } from 'react';

import Log from 'logs/Log';
import Header from 'header/App';
import UserProfile from 'user/UserProfile';

const DashboardPage = (props) => {
  const [userProfileIsHidden, setUserProfileIsHidden] = useState(true);

  function showUserProfile() {
    setUserProfileIsHidden(false);
  }

  function hideUserProfile() {
    setUserProfileIsHidden(true);
  }

  return (
    <React.Fragment>
      <Header toggleUserProfile={showUserProfile} />
      <Log />
      <UserProfile
        isHidden={userProfileIsHidden}
        toggleUserProfile={hideUserProfile}
      />
    </React.Fragment>
  );
};

export default DashboardPage;
