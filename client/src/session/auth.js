import axios from 'axios';

//action types
const GET_CURRENT_USER = 'food-log/auth/GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'food-log/auth/GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAIL = 'food-log/auth/GET_CURRENT_USER_FAIL';
const LOGIN = 'food-log/auth/LOGIN';
const LOGIN_SUCCESS = 'food-log/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'food-log/auth/LOGIN_FAIL';

//reducer
const initialState = {
  currentUser: null,
};

export default function reducer(state = initialState, action) {
  console.log(action); //testing console log every action
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, loading: true };
    case GET_CURRENT_USER_SUCCESS:
      return {
        currentUser: action.payload,
        loading: false,
      };
    case GET_CURRENT_USER_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: null,
      };
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: null,
      };

    default:
      return state;
  }
}

//getUser action creators
export const getUser = () => ({
  type: GET_CURRENT_USER,
});

export const getUserSuccess = (user) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = () => ({
  type: GET_CURRENT_USER_FAIL,
});

//login action creators
export const loggingIn = () => ({
  type: LOGIN,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});

/**
 *
 * @param {Object} values   Object containing users email and password.
 */
export const login = (data) => async (dispatch) => {
  dispatch(loggingIn());

  try {
    const res = await axios.post('/auth/login', data);
    dispatch(loginSuccess(res.data));
  } catch {
    dispatch(loginFail());
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(getUser());

  try {
    const res = await axios.get('/auth/current_user');
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};
