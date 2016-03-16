/**
 * Created by epotignano on 29/02/16.
 */

import Firebase from "firebase";
import { FireRef, UidRef } from '../constants/Commons';
import {USER_CREATE, USER_DELETE, USER_UPDATE, USER_UPDATE_ERROR, USER_UPDATE_SUCCESS,
  USER_CREATE_FAILURE, USER_CREATE_SUCCESS, USER_READ, USER_READ_SUCCESS, USER_READ_FAILURE
} from "../constants/ActionTypes";


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


export function getUser() {
  return dispatch => {
    const _uid = localStorage.getItem(UidRef);
    let User = new Firebase(FireRef + '/users/' + _uid);
    User.on('value', (err, snapshot) => {
      if(err) {
        dispatch(userRetrieveError(err));
        Promise.reject(err);
      }
      dispatch(userRetrieveSuccess(snapshot.val()))
    });
  }
}

export function updateUser(userData) {
  //We're talking about a profile owner

  return dispatch => {
    const _uid = localStorage.getItem(UidRef);
    let User = new Firebase(FireRef + '/users/' + _uid);
    User.update(userData, (error) => {
      if(error) {
        dispatch(updateUserError(error));
        Promise.reject(error);
      }
      dispatch(updateUserSuccess(userData))
    })
  };
}

