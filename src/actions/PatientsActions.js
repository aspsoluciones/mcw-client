/**
 * Created by epotignano on 27/4/16.
 */

import axios from 'axios';
import { ApiRef } from '../constants/Commons';
import { PATIENT_READ_REQUEST, PATIENT_ADD_NEW_PATIENT, PATIENT_SELECT_CANCELLED, PATIENT_READ_SUCCESS, PATIENT_HIDE_DATA_FORM, PATIENT_READ_FAILURE, PATIENT_DISPLAY_DATA_FORM, PATIENT_SELECTED, PATIENT_SELECT } from '../constants/ActionTypes';
import validator from 'validator';

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

export function addPatientToAccount() {
  return {
    type: PATIENT_ADD_NEW_PATIENT,
    payload: {
      openModal: false,
      resetForm:false
    }
  }
}

function cancelSelection(){
  return {
    type: PATIENT_SELECT_CANCELLED
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
  return dispatch => {
    
    let isEmail = validator.isEmail(patientEmail);
    if(isEmail) {
      dispatch(patientRequest());
      PatientInstance.get('/' + companyID + '/' + patientEmail + '/')
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

export function createNewPatientWithSameEmail(){
  return dispatch => {
    dispatch(addPatientToAccount());
  }
}
export function cancelPatientSelection(){
  return dispatch => {
    dispatch(cancelSelection());
  }
}
export function hidePatientFillData(){
  return dispatch => {
    dispatch(hidePatientForm());
  }
}
