import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as sessionActions from './session/sessionRedux';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import DashboardPage from './pages/DashboardPage';
import GlobalStyle from './styles/GlobalStyle';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './shared/ProtectedRoute';
import PastLogs from './pages/PastLogs';
import SignupPage from './pages/SignupPage';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/" exact component={DashboardPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/archive" exact component={PastLogs} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default connect(null, sessionActions)(App);
