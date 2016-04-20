/**
 * Created by epotignano on 15/4/16.
 */

import {
  APPOINTMENT_FAILURE,
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_SELECTED
} from "../constants/ActionTypes";

function appointment(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case APPOINTMENT_SELECTED:
      return Object.assign({}, state, {
        isFetching: false,
        keep : action.appointment
      });
    case APPOINTMENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case APPOINTMENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case APPOINTMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.code
      });
    default:
      return state
  }
}

export default appointment;
