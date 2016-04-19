/**
 * Created by epotignano on 25/02/16.
 */
import { UidRef, ApiRef, TokenRef, RefreshTokenRef } from '../constants/Commons';
const LoginEndpoint = ApiRef + '/oauth/token';

import {
    LOGIN_ATTEMP,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMP,
   REGISTER_SUCCESS,
   REGISTER_FAILURE
} from "../constants/ActionTypes";

import axios from 'axios';

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

export function loginUser(credentials) {
  credentials.grant_type = 'password';

  return dispatch => {
    dispatch(LoginAttempt(credentials));

    axios({
      method: 'post',
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
    }).then((response) => {
      localStorage.setItem(TokenRef, response.access_token);
      localStorage.setItem(RefreshTokenRef, response.refresh_token);
      dispatch(loginSuccess());
      dispatch(TokenRefreshCount());
    }).catch((data) => {
      if(data.status == 401) {
        dispatch(loginError('INVALID_PERMISSIONS'));
      }
    });


    /*$.ajax({
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
      .success((response) => {
        localStorage.setItem(TokenRef, response.access_token);
        localStorage.setItem(RefreshTokenRef, response.refresh_token);
        dispatch(loginSuccess());
        dispatch(TokenRefreshCount());
      }).error((data)=> {
        if(data.status == 401) {
          dispatch(loginError('INVALID_PERMISSIONS'));
        }
      })*/

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
