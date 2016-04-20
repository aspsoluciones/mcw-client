import { combineReducers } from 'redux';
import auth from './Auth';
import user from './User';
import imageUpload from './ImageUpload';
import token from './Token';
import appointment from './Appointment';
const rootReducer = combineReducers({
  auth,
  user,
  imageUpload,
  token,
  appointment
});

export default rootReducer;

