/**
 * Created by epotignano on 15/4/16.
 */

import {
 APPOINTMENT_FAILURE, APPOINTMENT_REQUEST, APPOINTMENT_SUCCESS
} from '../constants/ActionTypes';


function AppointmentRequest(){
  return {
    type: APPOINTMENT_REQUEST
  }
}

function AppointmentFailure() {
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


export function TakeAppointment(){
  return dispatch => {
    dispatch(AppointmentRequest());
    // Error
    dispatch(AppointmentFailure());
    //Success
    dispatch(AppointmentSuccess());
  }

}

