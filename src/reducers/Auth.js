/**
 * Created by epotignano on 26/02/16.
 */

import { 
    LOGIN_ATTEMP,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMP,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from "../constants/ActionTypes";

function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('mcw_uid') ? true : false
}, action) {
  switch (action.type) {
    case LOGIN_ATTEMP:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.code
      });
    case REGISTER_ATTEMP:
        return Object.assign({}, state, {
            isFetching: true,
            provider: action.provider
        });
    case REGISTER_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            registerError: action.error
        });
    case REGISTER_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            registerSuccess: true
        });
    default:
      return state
  }
}

export default auth;
