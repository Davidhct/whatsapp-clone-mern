import * as types from './actionTypes';
import { auth, googleAuthProvider } from './../firebaseUtils';
// sign up
const signUpStart = () => ({
  type: types.SIGNUP_START,
});
const signUpSuccess = (user) => ({
  type: types.SIGNUP_SUCCESS,
  payload: user,
});
const signUpFail = (error) => ({
  type: types.SIGNUP_FAIL,
  payload: error,
});

// sign in
const signInStart = () => ({
  type: types.SIGNIN_START,
});
const signInSuccess = (user) => ({
  type: types.SIGNIN_SUCCESS,
  payload: user,
});
const signInFail = (error) => ({
  type: types.SIGNIN_FAIL,
  payload: error,
});

// sign out
const signOutStart = () => ({
  type: types.SIGNOUT_START,
});
const signOutSuccess = () => ({
  type: types.SIGNOUT_SUCCESS,
});
const signOutFail = (error) => ({
  type: types.SIGNOUT_FAIL,
  payload: error,
});
// user
export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});
// google sign in
const googleSignInStart = () => ({
  type: types.GOOGLE_SIGNIN_START,
});
const googleSignInSuccess = (user) => ({
  type: types.GOOGLE_SIGNIN_SUCCESS,
  payload: user,
});
const googleSignInFail = (error) => ({
  type: types.GOOGLE_SIGNIN_FAIL,
  payload: error,
});

// sign up
export const signUpInitiate = (displayName, email, password) => {
  return function (dispatch) {
    dispatch(signUpStart());

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName,
        });
        dispatch(signUpSuccess(user));
      })
      .catch((error) => dispatch(signUpFail(error.message)));
  };
};

// sign in
export const signInInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(signInStart());

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(signInSuccess(user));
      })
      .catch((error) => dispatch(signInFail(error.message)));
  };
};

// sign out
export const signOutInitiate = () => {
  return function (dispatch) {
    dispatch(signOutStart());

    auth
      .signOut()
      .then((res) => dispatch(signOutSuccess()))
      .catch((error) => dispatch(signOutFail(error.message)));
  };
};

// google sign in
export const googleSignInInitiate = () => {
  return function (dispatch) {
    dispatch(googleSignInStart());
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(googleSignInSuccess(user));
      })
      .catch((error) => dispatch(googleSignInFail(error.message)));
  };
};
