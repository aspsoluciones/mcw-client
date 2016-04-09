/**
 * Created by epotignano on 25/02/16.
 */
import { UidRef, ApiRef, TokenRef } from '../constants/Commons';
const LoginEndpoint = ApiRef + '/oauth/token';

import {
    LOGIN_ATTEMP,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMP,
   REGISTER_SUCCESS,
   REGISTER_FAILURE
} from "../constants/ActionTypes";

function LoginAttempt (credentials) {
  return {
    type: LOGIN_ATTEMP,
    isFetching: true,
    isAuthenticated: false
  }
}


function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    error: false,
    code: ''
  }
}

function loginError(code) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error: true,
    code
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
    $.ajax({
      type: "POST",
      url: LoginEndpoint,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: $.param({
        grant_type: "password",
        username: credentials.username,
        password: credentials.password,
        domain: credentials.domain
      })
    })
      .success((data) => {
        dispatch(loginSuccess());
        localStorage.setItem(TokenRef, data.access_token)
      }).error((data)=> {
        if(data.status == 401) {
          dispatch(loginError('INVALID_PERMISSIONS'));
        }
      })

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
