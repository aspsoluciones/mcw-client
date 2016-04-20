/**
 * Created by epotignano on 25/02/16.
 */
import { UidRef, ApiRef, TokenRef, RefreshTokenRef, BaseRef } from '../constants/Commons';


import {
    LOGIN_ATTEMP,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMP,
   REGISTER_SUCCESS,
   REGISTER_FAILURE,
  INVALID_SESSION
} from "../constants/ActionTypes";

import axios from 'axios';

let OauthInstance = axios.create({
  'baseURL': BaseRef + '/oauth',
  'headers': { 'Content-Type': 'application/x-www-form-urlencoded' }
});


import {
  TokenRefreshCount
} from '../actions/TokenActions';

function LoginAttempt (credentials) {
  return {
    type: LOGIN_ATTEMP,
    isFetching: true,
    isAuthenticated: false
  }
}


function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    error:false,
    payload: response
  }
}

function loginError(code) {
  return {
    type: LOGIN_FAILURE,
    payload: new Error(code),
    error: true
  }
}

function RegisterAttemp() {
 return {
    type: REGISTER_ATTEMP,
    isFetching: true,
    isAuthenticated: false
  }
}

function RegisterFailure(error) {
 return {
    type: REGISTER_FAILURE,
    isFetching: true,
    code: error.code
  }
}

function RegisterSuccess(user) {
 return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    user
  }
}

function invalidSession() {
  return {
    type: INVALID_SESSION,
    isFetching: false,
    isAuthorized: false
  }
}

export function invalidateSession() {
  return dispatch => {
    dispatch(invalidateSession());
  }
}


export function loginUser(credentials) {
  credentials.grant_type = 'password';
  var _params = $.param({
    grant_type: "password",
    username: credentials.username,
    password: credentials.password,
    domain: credentials.domain
  });
  return dispatch => {
    dispatch(LoginAttempt(credentials));
    OauthInstance.post('/token', _params).then((response) => {
      localStorage.setItem(TokenRef, response.access_token);
      localStorage.setItem(RefreshTokenRef, response.refresh_token);
      dispatch(loginSuccess(response));
    }).catch((data) => {
      if(data.status == 401) {
        dispatch(loginError('INVALID_PERMISSIONS'));
      }
    });
  }
}

/*export function registerUser(userData) {
  return dispatch => {
    var _modifiedEmail = userData.email.replace(/\./g, '');
    var _optins = new Firebase(FireRef + 'optins/' + _modifiedEmail);

    var _userData = {
      email: userData.email,
      password : Math.random().toString(36).slice(-8)
    };

    _optins.set(_userData, (error)=> {
      if(error) {
        dispatch(RegisterFailure(error));
        return Promise.reject(_userData)
      }
      else {
        // Dispatch the success action
        dispatch(RegisterSuccess(_userData));
        dispatch(loginUser({username: _userData.email, password: _userData.password}));
      }
    });
  }
}*/
