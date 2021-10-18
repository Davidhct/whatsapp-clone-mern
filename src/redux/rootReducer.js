import { combineReducers } from 'redux';

import userReducer from './reducer';

export default combineReducers({
  user: userReducer,
});
