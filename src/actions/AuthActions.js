/**
 * Created by epotignano on 25/02/16.
 */
import { UidRef, ApiRef, TokenRef, RefreshTokenRef, BaseRef, ExpiresInRef} from '../constants/Commons';


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

function saveResponseInLocalStorage(response) {
  localStorage.setItem(TokenRef, response.access_token);
  localStorage.setItem(RefreshTokenRef, response.refresh_token);
  localStorage.setItem(ExpiresInRef, response.expires_in);
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
      saveResponseInLocalStorage(response.data);
      dispatch(loginSuccess(response));
      dispatch(startCount(response.expires_in))
    }).catch((data) => {
      if(data.status == 401) {
        dispatch(loginError('INVALID_PERMISSIONS'));
      }
    });
  }
}

function startCount(time) {
  setTimeout(() =>{
    var _params = $.param({
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem(RefreshTokenRef)
    });

    OauthInstance.post('/token',_params)
      .then((response) => {
        saveResponseInLocalStorage(response.data);
        startCount(localStorage.getItem(ExpiresInRef) * 1000 * .75);
      }).catch((xhr, status, text) => {
      if(xhr.status == 400) {
        //Deal with it
        // When the token is not valid, kick the user to the login or render a login modal
        }
      });
  }, time);

  return {
    'status': 'TokenRefreshStarted'
  }
}


export function TokenRefreshCount(tokenTimeOut) {
  return dispatch => {
    dispatch(startCount(tokenTimeOut))
  }
}
