/**
 * Created by epotignano on 29/02/16.
 */

import Firebase from "firebase";
import { FireRef, UidRef } from '../constants/Commons';
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
    axios.get('/usuarios/' + 'dominio=' + userData.domain + '/username='+ userData.username)
  }
}

export function updateUser(userData) {
  //We're talking about a profile owner

  return dispatch => {

  };
}

