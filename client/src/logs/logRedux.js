import axios from 'axios';

//action types
const GET_CURRENT_LOG = 'food-log/logs/GET_CURRENT_LOG';
const GET_CURRENT_LOG_SUCCESS = 'food-log/logs/GET_CURRENT_LOG_SUCCESS';
const GET_CURRENT_LOG_FAIL = 'food-log/logs/GET_CURRENT_LOG_FAIL';

//action reducer
const initialState = {
  loading: true,
  currentLog: null,
};

export default function reducer(state = initialState, action) {
  console.log(action); //testing console log every action
  switch (action.type) {
    case GET_CURRENT_LOG:
      return { ...state, loading: true };
    case GET_CURRENT_LOG_SUCCESS:
      return { ...state, loading: false, currentLog: action.payload };
    case GET_CURRENT_LOG_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

//action creator
const gettingLog = () => ({
  type: GET_CURRENT_LOG,
});

const getLogSuccess = (log) => ({
  type: GET_CURRENT_LOG_SUCCESS,
  payload: log,
});

const getLogFail = () => ({
  type: GET_CURRENT_LOG_FAIL,
});

//operations
/**
 * Function to get a log for a specified user.
 *
 * @param {Number}  user_id     User's ID. Must match currently authenticated user.
 * @param {Date}    date        A Javascript Date() instance formatted as an
 *                                ISO String OR as yyyy-mm-dd. Important!
 */
export const getLog = (date) => async (dispatch) => {
  dispatch(gettingLog());

  try {
    const res = await axios.get(`/user/logs/${date}`);

    //if no log exists, create new one
    dispatch(getLogSuccess(res.data));
  } catch {
    dispatch(getLogFail());
  }
};
