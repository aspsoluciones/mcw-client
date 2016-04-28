/**
 * Created by epotignano on 27/4/16.
 */
import { PATIENT_READ_REQUEST, PATIENT_READ_SUCCESS, PATIENT_READ_FAILURE } from '../constants/ActionTypes';
const PatientInitialState = {

};

export default function patient (state = PatientInitialState, action) {
  switch(action.type) {
    case PATIENT_READ_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PATIENT_READ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patient: action.payload
      };
    case PATIENT_READ_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default: return state;
  }
}
