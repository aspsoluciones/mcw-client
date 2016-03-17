/**
 * Created by epotignano on 17/03/16.
 */

import {
  IMAGE_READ, IMAGE_READ_FAILURE, IMAGE_READ_SUCCESS, IMAGE_READ_PROGRESS,
  IMAGE_UPLOAD, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_PROGRESS
} from '../constants/ActionTypes';

function imageUpload(state = {
  fileUrl: '',
  url: '',
  readProgress: 0,
  error: '',
  success: '',
  fetchProgress: 0
}, action) {
  switch(action.type) {
    case(IMAGE_READ_PROGRESS):
          return Object.assign({}, state, {
            readProgress: action.progress
          });
    case(IMAGE_READ_SUCCESS):
          return Object.assign({}, state, {
            fileUrl: action.fileUrl
          });
    default:
      return state;
  }
}

export default imageUpload;
