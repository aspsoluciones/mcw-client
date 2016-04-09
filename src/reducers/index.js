import { combineReducers } from 'redux';
import auth from './Auth';
import user from './User';
import imageUpload from './ImageUpload';
import token from './Token';
const rootReducer = combineReducers({
  auth,
  user,
  imageUpload,
  token
});

export default rootReducer;

