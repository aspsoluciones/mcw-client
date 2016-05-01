/**
 * Created by epotignano on 27/4/16.
 */

import axios from 'axios';
import { ApiRef } from '../constants/Commons';
import { PATIENT_READ_REQUEST, PATIENT_READ_SUCCESS, PATIENT_HIDE_DATA_FORM, PATIENT_READ_FAILURE, PATIENT_DISPLAY_DATA_FORM, PATIENT_SELECTED, PATIENT_SELECT } from '../constants/ActionTypes';

const PatientInstance = axios.create({
  'baseURL': ApiRef + '/pacientes'
});

function patientRequest(){
  return {
    type: PATIENT_READ_REQUEST
  }
}

function patientReadFailure(error) {
  return {
    type: PATIENT_READ_FAILURE,
    error
  }
}

function patientSelected(payload){
  return {
    type: PATIENT_SELECTED,
    payload
  }
}

function patientSelectModalOpen(){
  return {
    type: PATIENT_SELECT,
    payload: {
      openModal: true
    }
  }
}

function patientReadSuccess(payload){
  return {
    type: PATIENT_READ_SUCCESS,
    payload
  }

}

function displayPatientForm() {
  return {
    type: PATIENT_DISPLAY_DATA_FORM
  }
}

function hidePatientForm(){
  return {
    type: PATIENT_HIDE_DATA_FORM
  }
}

export function getPatientByEmail(patientEmail, companyID) {
  const companyMock = '39060';
  return dispatch => {
    let _checkEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    let isEmail = _checkEmail.test(patientEmail);
    if(isEmail) {
      dispatch(patientRequest());
      PatientInstance.get('/' + companyMock + '/' + patientEmail + '/')
        .then((data) => {
          dispatch(patientReadSuccess(data.data))
        })
        .catch((error) => {
          dispatch(patientReadFailure(error))
        })
    }
  };
}

export function selectPatient(patient){
  return dispatch => {
    dispatch(patientSelected(patient));
  }
}

export function patientSelectModal(){
  return dispatch => {
    dispatch(patientSelectModalOpen());
  }
}

export function fillPatientData(){
  return dispatch => {
    dispatch(displayPatientForm());
  }
}

export function hidePatientFillData(){
  return dispatch => {
    dispatch(hidePatientForm());
  }
}
