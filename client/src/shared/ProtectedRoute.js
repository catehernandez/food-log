import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 * Code from React Training
 */
function ProtectedRoute({ component: Component, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default connect(mapStateToProps)(ProtectedRoute);
