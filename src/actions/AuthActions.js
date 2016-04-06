/**
 * Created by epotignano on 25/02/16.
 */
import { UidRef, ApiRef, TokenRef } from '../constants/Commons';
const LoginEndpoint = ApiRef + '/oauth/token';
import Firebase from 'firebase';
import { getUser } from '../actions/UserActions';

import {
    LOGIN_ATTEMP,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMP,
    LOGIN_ATTEMP_FACEBOOK,
   REGISTER_SUCCESS,
   REGISTER_FAILURE
} from "../constants/ActionTypes";

function LoginAttempt (credentials) {
  return {
    type: LOGIN_ATTEMP,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function LoginAttempFacebook() {
  return {
    type: LOGIN_ATTEMP_FACEBOOK,
    isFetching: true,
    isAuthenticated: false
  }
}

function loginSuccess(user, loginType) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    loginType,
    token: user.token
  }
}

function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    code: error.code
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

export function loginUser(credentials) {
  credentials.grant_type = 'password';
  return dispatch => {
    dispatch(LoginAttempt(credentials));
    fetch(LoginEndpoint, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => {
      console.log(data);
        dispatch(loginSuccess(data));
    }).cacth(error => {
      console.log(error);
      dispatch(loginError(error));
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
