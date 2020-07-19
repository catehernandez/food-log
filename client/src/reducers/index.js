import { combineReducers } from 'redux';

import session from 'session/sessionRedux';
import log from 'logs/logRedux';

export default combineReducers({
  session,
  log,
});
