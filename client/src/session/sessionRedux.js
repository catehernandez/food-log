import axios from 'axios';
axios.defaults.withCredentials = true;

//action types
const GET_CURRENT_USER = 'food-log/auth/GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'food-log/auth/GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAIL = 'food-log/auth/GET_CURRENT_USER_FAIL';
const LOGIN = 'food-log/auth/LOGIN';
const LOGIN_SUCCESS = 'food-log/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'food-log/auth/LOGIN_FAIL';
const LOGOUT = 'food-log/auth/LOGOUT';
const LOGOUT_SUCCESS = 'food-log/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'food-log/auth/LOGOUT_FAIL';
const SIGNUP = 'food-log/auth/SIGNUP';
const SIGNUP_SUCCESS = 'food-log/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'food-log/auth/SIGNUP_FAIL';

//reducer
const initialState = {
  currentUser: null,
  errors: null,
  loading: false,
};

export default function reducer(state = initialState, action) {
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
        errors: action.payload,
      };
    case LOGOUT:
      return { ...state, loading: true };
    case LOGOUT_SUCCESS:
      return { loading: false, currentUser: null };
    case LOGOUT_FAIL:
      return { ...state, loading: false };
    case SIGNUP:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
      return { loading: false, currentUser: action.payload };
    case SIGNUP_FAIL:
      return { ...state, loading: false };

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

export const loginFail = (errCode) => ({
  type: LOGIN_FAIL,
  payload: errCode,
});

//logout action creators
export const loggingOut = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFail = () => ({
  type: LOGOUT_FAIL,
});

//signupt action creators
export const signingUp = () => ({
  type: SIGNUP,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFail = (errCode) => ({
  type: SIGNUP_FAIL,
  payload: errCode,
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
  } catch (err) {
    dispatch(loginFail(err.response.status));
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(getUser());

  try {
    const res = await axios.get('/user');
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(loggingOut());

  try {
    await axios.get('/auth/logout');
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFail);
  }
};

export const signup = (values) => async (dispatch) => {
  dispatch(signingUp());

  try {
    const res = await axios.post('/auth/signup', values);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail(err.response.status));
  }
};
