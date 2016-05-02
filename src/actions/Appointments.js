/**
 * Created by epotignano on 15/4/16.
 */

import {
 APPOINTMENT_FAILURE, APPOINTMENT_REQUEST, APPOINTMENT_SUCCESS, APPOINTMENT_SELECTED
} from '../constants/ActionTypes';

import axios from 'axios';

var DTO = {
  "id_tipo_solicitud":45,
  "id_empresa":631033,
  "solicitante": {
    nombre: '',
    apellido: '',
    sexo: '',
    fecha_de_nacimiento: ''
  }, // Solicitante del turno
  "id_persona_emisora": 621034,
  "nombre_persona_emisora": '', // Nombre y apellido del paciente
  "id_responsable_servicio": 631034, // id del medico,
  "nombre_responsable_servicio": '', // Nombre del medico, con titulo incluido, ejemplo Dra. Ana Maria Garcia
  "fecha_inicio": "", //Fecha y hora de inicio de la cita.
  "fecha_fin": "", // Fecha y hora de fin de la cita
  "comentario_emisor": "",
  "id_estatus" : 1, // valor fijo,
  "id_estado": 22, // valor fijo
  "id_persona_registro": 631034, //En el caso de citas desde la web, debe ser el id  del paciente
  "nombre_persona_registro": "", // NOmbre y apellido del paciente.
  "etapas_solicitud":[
        {

            "id_procedimiento":null, //id del procedimiento médico.  Este id debería venir al inicio junto con la lectura de los datos del doctor.
            "fecha_inicio":"", //Fecha y hora de inicio de la cita.
            "fecha_fin":"", //Fecha y hora de finalización de la cita.  Esta hora de finalizacion debe ser calculada.
            "id_estado":22, //Por defecto
            "id_estatus":1, //Por defecto
            "id_localidad":null,
            "nombre_localidad":null
        }
    ]
}

function AppointmentSelected(appointment) {
  return {
    type: APPOINTMENT_SELECTED,
    payload: appointment
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
    axios.post('/solicitudes', DTO).then((data) => {
      dispatch(AppointmentSuccess(data));
    }).catch((error) => {
      dispatch(AppointmentFailure(error));
    });
  }
}
