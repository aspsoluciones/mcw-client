/**
 * Created by epotignano on 29/02/16.
 */

import { FireRef, UidRef, ApiRef } from '../constants/Commons';
import {USER_CREATE, USER_DELETE, USER_UPDATE, USER_UPDATE_ERROR, USER_UPDATE_SUCCESS,
  USER_CREATE_FAILURE, USER_CREATE_SUCCESS, USER_READ, USER_READ_SUCCESS, USER_READ_FAILURE
} from "../constants/ActionTypes";

import axios from 'axios';


function updateUserSuccess(userData) {
  return {
    type: USER_CREATE_SUCCESS,
    userData
  }
}

function updateUserError(error) {
  return {
    type: USER_CREATE_FAILURE,
    error
  }
}

function userRetrieveError(error) {
  return {
    type: USER_READ_FAILURE,
    error
  }
}

function userRetrieveSuccess(userData) {
  return {
    type: USER_READ_SUCCESS,
    userData
  }
}


export function getUser(userData) {
  //userData = { domain, username };
  return dispatch => {
    axios({url: '/usuarios/' + 'dominio=' + userData.domain + '/username='+ userData.username, method: 'GET'})
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error)
    })
  }
}

export function updateUser(userData) {
  //We're talking about a profile owner
  return dispatch => {

  };
}

