import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import session from 'session/sessionRedux';
import log from 'log/logRedux';

const rootReducer = combineReducers({
  session,
  log,
});

export default withReduxStateSync(rootReducer);
