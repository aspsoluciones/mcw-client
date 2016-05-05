/**
 * Created by epotignano on 15/4/16.
 */

import {
  APPOINTMENT_FAILURE,
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_SELECTED,
  APPOINTMENT_READ_SUCCESS,

  APPOINTMENTS_READ_FAILURE,
  APPOINTMENTS_READ_REQUEST,
  APPOINTMENTS_READ_SUCCESS

} from "../constants/ActionTypes";

const initialState = {
  loading: false
};


function appointment(state = initialState, action) {
  switch (action.type) {

    case APPOINTMENTS_READ_REQUEST:
      return {
        ...state,
        loading: true
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
        data: action.payload
      };

    case APPOINTMENT_SELECTED:
      return Object.assign({}, state, {
        keep : action.payload
      });

    case APPOINTMENT_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case APPOINTMENT_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    case APPOINTMENT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: action.code
      });
    default:
      return state
  }
}

export default appointment;
