import * as types from './actionTypes';

const INTIAL_STATE = {
  loading: false,
  currentUser: null,
  error: null,
};

const userReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNUP_START:
    case types.SIGNIN_START:
    case types.SIGNOUT_START:
    case types.GOOGLE_SIGNIN_START:
      return {
        ...state,
        loading: true,
      };
    case types.SIGNOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };

    case types.SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.SIGNUP_SUCCESS:
    case types.SIGNIN_SUCCESS:
    case types.GOOGLE_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.SIGNUP_FAIL:
    case types.SIGNIN_FAIL:
    case types.SIGNOUT_FAIL:
    case types.GOOGLE_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
