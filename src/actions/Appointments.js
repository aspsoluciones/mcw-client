/**
 * Created by epotignano on 15/4/16.
 */

import {
 APPOINTMENT_FAILURE,
 APPOINTMENT_REQUEST,
 APPOINTMENT_SUCCESS,
 APPOINTMENT_SELECTED,
 APPOINTMENTS_READ_REQUEST,
 APPOINTMENTS_READ_SUCCESS,
 APPOINTMENTS_READ_FAILURE
} from '../constants/ActionTypes';

import axios from 'axios';
import moment from 'moment';

var DTO = {
  "id_tipo_solicitud":45,
  "id_empresa":631033,
  "solicitante": {
    nombre: '',
    apellido: '',
    sexo: '',
    fecha_de_nacimiento: ''
  }, // Solicitante del turno
  "id_persona_emisora": -1,
  "nombre_persona_emisora": '', // Nombre y apellido del paciente
  "id_responsable_servicio": 631034, // id del medico,
  "nombre_responsable_servicio": '', // Nombre del medico, con titulo incluido, ejemplo Dra. Ana Maria Garcia
  "fecha_inicio": "", //Fecha y hora de inicio de la cita.
  "fecha_fin": "", // Fecha y hora de fin de la cita
  "comentario_emisor": "",
  "id_estatus" : 1, // valor fijo,
  "id_estado": 22, // valor fijo
  "id_persona_registro": -1, //En el caso de citas desde la web, debe ser el id  del paciente
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

function AppointmentsRequest() {
  return {
    type: APPOINTMENTS_READ_REQUEST
  }
}

function AppointmentsRequestSuccess(payload) {
  return {
    type: APPOINTMENTS_READ_SUCCESS,
    payload
  }
}

function AppointmentsRequestFailure(error) {
  return {
    type: APPOINTMENTS_READ_FAILURE,
    error
  }
}

export function GetAppointments(doctorUsername, range) {
  //If a date range is specified.
  return dispatch =>{
    if(range){
      axios.get('agenda/turnosdisponibles/' + doctorUsername + '/' + range.minDate + '/' + range.maxDate)
        .then((data)=> {
            dispatch(AppointmentSuccess(data.data));
        }).catch((error) => {
          dispatch(AppointmentsRequestFailure(error))
        })
    } else {
      axios.get('agenda/turnosdisponibles/' + doctorUsername)
        .then((data)=> {
            dispatch(AppointmentSuccess(data.data));
        }).catch((error) => {
          dispatch(AppointmentsRequestFailure(error))
        })
    }
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
    axios.post('/solicitudes', transformAppointment(appointment)).then((data) => {
      dispatch(AppointmentSuccess(data));
    }).catch((error) => {
      dispatch(AppointmentFailure(error));
    });
  }
}


//Utils methods

function transformAppointment(appointment){
  let _dataToSend = DTO;
  const { solicitante, turno } = appointment;
  const { doctor, location } = turno;

  _dataToSend.nombre_persona_emisora = solicitante.nombre + ' ' +  solicitante.apellido;
  _dataToSend.nombre_persona_registro = solicitante.nombre + ' ' + solicitante.apellido;
  _dataToSend.solicitante = fillSolicitante(solicitante);

  _dataToSend.fecha_inicio = turno.fecha_hora_inicio.toDate();
  _dataToSend.fecha_fin = turno.fecha_hora_inicio.add('m', turno.duracion_en_minutos).toDate();

  _dataToSend.id_persona_emisora = solicitante.id;
  _dataToSend.nombre_responsable_servicio = doctor.titulo + ' ' + doctor.apellido + ' ' + doctor.nombre;

  _dataToSend.etapas_solicitud[0].id_localidad = location.id;
  _dataToSend.etapas_solicitud[0].nombre_localidad = location.nombre;

  _dataToSend.etapas_solicitud[0].fecha_inicio = _dataToSend.fecha_inicio;
  _dataToSend.etapas_solicitud[0].fecha_fin = _dataToSend.fecha_fin;

  return _dataToSend;

}

function fillSolicitante(solicitante){
  var _solicitante = {};
  var keys = Object.keys(DTO.solicitante)
  keys.map((key, i) => {
    _solicitante[key] = solicitante[key]
  })

  _solicitante.localidades = [];

  var _localidad = {
    "id_tipo" : 12,
    contactos: []
  }

  if(solicitante.numero_tel_celular) {
    _localidad.contactos.push({
      "id_tipo" : 14,
      "valor" : solicitante.numero_tel_celular
    })
  }

  if(solicitante.numero_tel_particular) {
    _localidad.contactos.push({
      "id_tipo": 12,
      "valor": solicitante.numero_tel_particular
    })
  }

  if(solicitante.email_particular) {
    _localidad.contactos.push({
      "id_tipo": 15,
      "valor": solicitante.email_particular
    })
  }

  _solicitante.localidades.push(_localidad);

  return _solicitante;
}
