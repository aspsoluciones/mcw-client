/**
 * Created by epotignano on 29/02/16.
 */

import {
  USER_CREATE, USER_CREATE_FAILURE, USER_CREATE_SUCCESS,
  USER_UPDATE, USER_UPDATE_ERROR, USER_UPDATE_SUCCESS,
  USER_READ, USER_READ_SUCCESS, USER_READ_FAILURE
} from "../constants/ActionTypes";

function user(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case USER_CREATE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
        errorMessage: ''
      });
    case USER_CREATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        success: false,
        errorMessage: action.error
      });

    case USER_UPDATE:
      return Object.assign({}, state, {
        updating: true
      });
    case USER_UPDATE_ERROR:
      return Object.assign({}, state, {
        updating: false,
        success: false,
        errorMessage: action.error
      });
    case USER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
        errorMessage: ''
      });

    case USER_READ:
      return Object.assign({}, state, {
        updating: true
      });
    case USER_READ_FAILURE:
      return Object.assign({}, state, {
        updating: false,
        success: false,
        errorMessage: action.error
      });
    case USER_READ_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
        errorMessage: '',
        userData: action.userData
      });
    default:
      return state
  }
}

export default user;
