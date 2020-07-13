import * as actions from 'actions/authActions';

const initialState = {
  currentUser: null,
  loading: false,
  hasErrors: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CURRENT_USER:
      return { ...state, loading: true };
    case actions.GET_CURRENT_USER_SUCCESS:
      return { currentUser: action.payload, loading: false, hasErrors: false };
    case actions.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
}
