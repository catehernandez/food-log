import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </BrowserRouter>
  );
}

export default App;
