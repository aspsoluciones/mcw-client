/**
 * Created by epotignano on 27/4/16.
 */
import { PATIENT_READ_REQUEST, PATIENT_SELECT,
  PATIENT_READ_SUCCESS, PATIENT_DISPLAY_DATA_FORM,
  PATIENT_HIDE_DATA_FORM,
  PATIENT_READ_FAILURE, PATIENT_SELECTED } from '../constants/ActionTypes';
const PatientInitialState = {
  openModal: false
};

export default function patient (state = PatientInitialState, action) {
  switch(action.type) {
    case PATIENT_SELECTED:
      return {
        ...state,
        selectedPatient: action.payload,
        openModal: false
      };

    case PATIENT_DISPLAY_DATA_FORM:
          return {
            ...state,
            displayForm: true,
            selectedPatient:null
          };
    case PATIENT_SELECT:
      return {
        ...state,
        openModal: true
      };
    case PATIENT_READ_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case PATIENT_READ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patient: action.payload,
        openModal : action.payload.length && action.payload.length != 1
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
