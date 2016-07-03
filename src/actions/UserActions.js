/**
 * Created by epotignano on 29/02/16.
 */

import { FireRef, UidRef, ApiRef } from '../constants/Commons';
import {USER_CREATE, USER_DELETE, USER_UPDATE, USER_UPDATE_ERROR, USER_UPDATE_SUCCESS,
  USER_CREATE_FAILURE, USER_CREATE_SUCCESS, USER_READ, USER_READ_SUCCESS, USER_READ_FAILURE,
  USER_LANGUAGE_FAILURE, USER_LANGUAGE_REQUEST, USER_LANGUAGE_SUCCESS
} from "../constants/ActionTypes";

import axios from 'axios';

function updateUserSuccess(userData) {
  return {
    type: USER_CREATE_SUCCESS,
    userData
  }
}

function userLanguageSuccess(data) {
  return {
    type: USER_LANGUAGE_SUCCESS,
    data
  }
}

function userLanguageRequest(data) {
  return {
    type: USER_LANGUAGE_REQUEST
  }
}

function userLanguageFailure(error) {
  return {
    type: USER_LANGUAGE_FAILURE,
    error
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

export function changeLanguage(lang) {
  if(!lang) lang = 'es-PA';
    var config = {
      headers: { 'User-Language': lang }
    };

  return dispatch => {
    dispatch(userLanguageRequest());

    axios.get(ApiRef + '/localization/ConsultaTurnosWeb', config)
        .then((response) => {
          response.data.selectedLang = lang;
          dispatch(userLanguageSuccess(response.data))
        })
        .catch((error) => {
          dispatch(userLanguageFailure(error));
        })
  }
}