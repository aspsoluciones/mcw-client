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
  APPOINTMENTS_READ_SUCCESS,
  APPOINTMENT_NEW_DATE

} from "../constants/ActionTypes";

import moment from 'moment';
import { browserHistory } from 'react-router';

const initialState = {
  loadingAppointments : false, readSuccess:false, loadingDoctorData : false, responsable_servicio: {}, selectedDay : moment()
};

/*** UTILS ***/

function mergeDoctorAndAppointments (responsable_servicio, turnosPorLocalidades){

  if(!turnosPorLocalidades.forLocation){
    responsable_servicio.localidades.map(function(institution, index) {
      turnosPorLocalidades.map((function(turnos){
        if(turnos.id_localidad == institution.localidad.id){
          responsable_servicio.localidades[index].turnos = turnos.turnos;
        }
      }));
    });
  } else {
    responsable_servicio.localidades.some(function(institution, index) {
      turnosPorLocalidades.map((function(turnos){
        if(turnos.id_localidad == institution.localidad.id && institution.localidad.id == turnosPorLocalidades.forLocation){
          responsable_servicio.localidades[index].turnos = turnos.turnos;
        }
      }));
    });
  }


  return responsable_servicio;

}


/*** REDUCER ***/
function appointment(state = initialState, action) {
  switch (action.type) {

    case APPOINTMENTS_READ_REQUEST:

      if(action.payload && action.payload.locationID){
         return Object.assign({}, state, {
          loadingAppointmentsForLocation : action.payload.locationID,
          readSuccess: false
        })
      }

    return Object.assign({}, state, {
        loadingAppointments: true,
        readSuccess: false
      })

    case APPOINTMENTS_READ_FAILURE:
      return Object.assign({}, state, {
        loadingAppointments: false,
        error: action.error
      })

    case APPOINTMENT_REQUEST :
      return Object.assign({}, state, {
         requestingAppointment: true
      })

    case APPOINTMENT_SUCCESS :

    return Object.assign({}, state, {
        requestingAppointment: false,
        appointmentSuccess: true
      })


    case APPOINTMENT_FAILURE :
      return Object.assign({}, state, {
          requestingAppointment: false,
          appointmentSuccess: false,
          error: action.error
        })


    /*case APPOINTMENT_NEW_DATE:
      return {
        ...state
      }*/ 

    case APPOINTMENTS_READ_SUCCESS:
      const _responsable_servicio = mergeDoctorAndAppointments(state.responsable_servicio, action.payload);
      return Object.assign({}, state, {  
          loadingAppointments: false,
          loadingAppointmentsForLocation: false,
          responsable_servicio: _responsable_servicio, 
          readSuccess: true
        })

    case APPOINTMENT_SELECTED:
      return Object.assign({}, state, {  
        keep: action.payload
      })

    case DOCTOR_READ_REQUEST:
      return Object.assign({}, state, {  
        loadingDoctorData: true,
        loadingAppointments: true,
        readSuccess: false,
        doctorUsername: action.payload
      })

    case DOCTOR_READ_SUCCESS:
      return Object.assign({}, state, {  
        loadingDoctorData : false,
        responsable_servicio: action.payload
      })
    case DOCTOR_READ_FAILURE:
      return Object.assign({}, state, {  
        loadingDoctorData : false,
        errorMessage: action.error
      })

    default:
      return state
  }
}

export default appointment;
