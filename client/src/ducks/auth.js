import axios from 'axios';

//action types
const GET_CURRENT_USER = 'food-log/auth/GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'food-log/auth/GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAIL = 'food-log/auth/GET_CURRENT_USER_FAIL';

//reducer
const initialState = {
  currentUser: null,
  loading: false,
  hasErrors: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, loading: true };
    case GET_CURRENT_USER_SUCCESS:
      return { currentUser: action.payload, loading: false, hasErrors: false };
    case GET_CURRENT_USER_FAIL:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
}

//action creators
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

const fetchUser = () => async (dispatch) => {
  dispatch(getUser());

  try {
    const res = await axios.get('/auth/current_user');
    getUserSuccess(res.data);
  } catch (error) {
    dispatch(getUserFailure());
  }
};
