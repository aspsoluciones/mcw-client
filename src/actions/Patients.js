/**
 * Created by epotignano on 27/4/16.
 */

import axios from 'axios';
import { ApiRef } from '../constants/Commons';
import { PATIENT_READ_REQUEST, PATIENT_READ_SUCCESS, PATIENT_READ_FAILURE } from '../constants/ActionTypes';

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

function patientReadSuccess(payload){
  return {
    type: PATIENT_READ_SUCCESS,
    payload
  }

}

export function getPatientByEmail(patientEmail, companyID) {
  const companyMock = '39965';
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
