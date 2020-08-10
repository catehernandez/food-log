import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from 'redux-state-sync';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

//axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

//configure store
const syncConfig = {};
const middlewares = [thunk, createStateSyncMiddleware(syncConfig)];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

initStateWithPrevTab(store);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
