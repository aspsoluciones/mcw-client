/**
 * Created by epotignano on 15/4/16.
 */

import {
 APPOINTMENT_FAILURE, APPOINTMENT_REQUEST, APPOINTMENT_SUCCESS, APPOINTMENT_SELECTED
} from '../constants/ActionTypes';

function AppointmentSelected(appointment) {
  return {
    type: APPOINTMENT_SELECTED,
    appointment
  }
}

function AppointmentRequest(){
  return {
    type: APPOINTMENT_REQUEST
  }
}

function AppointmentFailure(error) {
  return {
    type: APPOINTMENT_FAILURE,
    error
  }
}

function AppointmentSuccess() {
  return {
    type: APPOINTMENT_SUCCESS
  }
}


export function TakeAppointment(appointment){
  return dispatch => {
   dispatch(AppointmentSelected(appointment));
  }
}

export function ConfirmAppointment(appointment) {
  return dispatch => {
    dispatch(AppointmentRequest());
    // Error
    dispatch(AppointmentFailure());
    //Success
    dispatch(AppointmentSuccess());
  }
}

