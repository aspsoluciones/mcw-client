/**
 * Created by epotignano on 15/4/16.
 */

import {
  APPOINTMENT_FAILURE,
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_SELECTED,
  APPOINTMENT_READ_SUCCESS,
  DOCTOR_READ_REQUEST,
  DOCTOR_READ_SUCCESS,
  DOCTOR_READ_FAILURE,
  APPOINTMENTS_READ_FAILURE,
  APPOINTMENTS_READ_REQUEST,
  APPOINTMENTS_READ_SUCCESS

} from "../constants/ActionTypes";

const initialState = {
  loadingAppointments : false, loadingDoctorData : false, doctor: {}, appointments: {}
};


function appointment(state = initialState, action) {
  switch (action.type) {

    case APPOINTMENTS_READ_REQUEST:
      return {
        ...state,
        loadingAppointments: true
      };

    case APPOINTMENTS_READ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case APPOINTMENTS_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments : action.payload
      };

    case APPOINTMENT_SELECTED:
      return {
        ...state,
        keep: action.payload
      };

    case DOCTOR_READ_REQUEST:
      return {
        ...state,
        loadingDoctorData: true
      };
    case DOCTOR_READ_SUCCESS:
      return {
        ...state,
        loadingDoctorData : false,
        doctor: action.payload
      };
    case DOCTOR_READ_FAILURE:
    return {
      ...state,
      loadingDoctorData : false,
      errorMessage: action.error
    };
    default:
      return state
  }
}

export default appointment;
