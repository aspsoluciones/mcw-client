/**
 * Created by epotignano on 27/4/16.
 */
import { PATIENT_READ_REQUEST, PATIENT_SELECT,
  PATIENT_READ_SUCCESS, PATIENT_DISPLAY_DATA_FORM,
  PATIENT_HIDE_DATA_FORM, PATIENT_ADD_NEW_PATIENT, PATIENT_SELECT_CANCELLED,
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

    case PATIENT_SELECT_CANCELLED:{
      return {
        ...state,
        openModal:false,
        resetForm: true,
        patient: null
      }
    }

    case PATIENT_ADD_NEW_PATIENT:{
      return {
        ...state,
        openModal:false,
        displayForm: true,
        resetForm: false,
        patient: null
      }
    }

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
      if(action.payload.length || (state.patient && state.patient.length)) {
        return {
          ...state,
          isLoading: false,
          patient: (action.payload.length) ? action.payload : state.patient,
          openModal : true,
          displayForm: false,
          selectedPatient: null
        };
      } else {
        return {
          ...state,
          isLoading: false
        }
      }
      break;


    case PATIENT_READ_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default: return state;
  }
}
