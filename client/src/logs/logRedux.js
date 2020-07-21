import axios from 'axios';

//action types
const GET_LOG = 'food-log/logs/GET_LOG';
const GET_LOG_SUCCESS = 'food-log/logs/GET_LOG_SUCCESS';
const GET_LOG_FAIL = 'food-log/logs/GET_LOG_FAIL';
const CREATE_LOG = 'food-log/logs/CREATE_LOG';
const CREATE_LOG_SUCCESS = 'food-log/logs/CREATE_LOG_SUCCESS';
const CREATE_LOG_FAIL = 'food-log/logs/CREATE_LOG_FAIL';

//action reducer
const initialState = {
  loading: true,
  currentLog: null,
  errors: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOG:
      return { ...state, loading: true };
    case GET_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        currentLog: action.payload,
        errors: null,
      };
    case GET_LOG_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case CREATE_LOG:
      return { ...state, loading: true };
    case CREATE_LOG_SUCCESS:
      return {
        ...state,
        currentLog: action.payload,
        errors: null,
        loading: false,
      };
    case CREATE_LOG_FAIL:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}

//action creator
const gettingLog = () => ({
  type: GET_LOG,
});

const getLogSuccess = (log) => ({
  type: GET_LOG_SUCCESS,
  payload: log,
});

const getLogFail = (errCode) => ({
  type: GET_LOG_FAIL,
  payload: errCode,
});

const creatingLog = () => ({
  type: CREATE_LOG,
});

const createLogSuccess = (newLog) => ({
  type: CREATE_LOG_SUCCESS,
  payload: newLog,
});

const createLogFail = (errCode) => ({
  type: CREATE_LOG_FAIL,
  payload: errCode,
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

    dispatch(getLogSuccess(res.data));
  } catch (err) {
    const statusCode = err.response.status;
    dispatch(getLogFail(statusCode));
  }
};

export const createLog = (date) => async (dispatch) => {
  dispatch(creatingLog());

  try {
    const res = await axios.post('/user/logs', { date: date });
    dispatch(createLogSuccess(res.data));
  } catch (err) {
    const statusCode = err.response.status;
    dispatch(createLogFail(statusCode));
  }
};
