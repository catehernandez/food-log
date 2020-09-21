import React, { useState } from 'react';

import CurrentLog from 'log/components/CurrentLog';
import Header from 'header/App';
import UserProfile from 'UserProfile/app';

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
      <CurrentLog />
      <UserProfile
        isHidden={userProfileIsHidden}
        toggleUserProfile={hideUserProfile}
      />
    </React.Fragment>
  );
};

export default DashboardPage;
