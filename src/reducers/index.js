import { combineReducers } from 'redux';
import auth from './Auth';
import user from './User';
const rootReducer = combineReducers({
  auth,
  user
});

export default rootReducer;

