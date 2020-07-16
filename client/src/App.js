import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as sessionActions from './session/sessionRedux';

import Dashboard from './dashboard';
import LoginPage from './session/LoginPage';
import SignupPage from './session/SignupPage';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
      </BrowserRouter>
    );
  }
}

export default connect(null, sessionActions)(App);
