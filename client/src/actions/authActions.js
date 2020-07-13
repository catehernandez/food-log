import axios from 'axios';

//action types
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

//action creators
export const getUser = () => ({
  type: GET_CURRENT_USER,
});

export const getUserSuccess = (user) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = () => ({
  type: GET_CURRENT_USER_FAILURE,
});

export const fetchUser = () => async (dispatch) => {
  dispatch(getUser());

  try {
    const res = await axios.get('/auth/current_user');
    getUserSuccess(res.data);
  } catch (error) {
    dispatch(getUserFailure());
  }
};
