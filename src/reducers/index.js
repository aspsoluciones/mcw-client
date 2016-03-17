import { combineReducers } from 'redux';
import auth from './Auth';
import user from './User';
import imageUpload from './ImageUpload';
const rootReducer = combineReducers({
  auth,
  user,
  imageUpload
});

export default rootReducer;

