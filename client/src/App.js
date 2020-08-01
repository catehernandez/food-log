import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as sessionActions from './session/sessionRedux';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import DashboardPage from './pages/DashboardPage';
import GlobalStyle from './styles/GlobalStyle';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfile from './user/UserProfile';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <UserProfile />
          <Route path="/" exact component={DashboardPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default connect(null, sessionActions)(App);
