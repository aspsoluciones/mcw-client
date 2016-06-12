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
 APPOINTMENTS_READ_FAILURE,
 DOCTOR_READ_REQUEST,
 DOCTOR_READ_SUCCESS,
 DOCTOR_READ_FAILURE,
 APPOINTMENT_NEW_DATE,
 VERIFY_APPOINTMENT_SUCCESS,
 VERIFY_APPOINTMENT_FAILURE
} from '../constants/ActionTypes';

import axios from 'axios';
import moment from 'moment';
import { browserHistory } from 'react-router';

let initialDate = {
  minDate: moment().format("MM-DD-YYYY"),
  maxDate: moment().add('d',6).format("MM-DD-YYYY")
}

var DTO = {
  "id_tipo_solicitud":45,
  "id_empresa":631033,
  "solicitante": {
    nombre: '',
    apellido: '',
    sexo: '',
    fecha_de_nacimiento: ''
  }, // Solicitante del turno
  "id_persona_emisora": null,
  "nombre_persona_emisora": '', // Nombre y apellido del paciente
  "id_responsable_servicio": null, // id del medico,
  "nombre_responsable_servicio": '', // Nombre del medico, con titulo incluido, ejemplo Dra. Ana Maria Garcia
  "fecha_inicio": "", //Fecha y hora de inicio de la cita.
  "fecha_fin": "", // Fecha y hora de fin de la cita
  "comentario_emisor": "",
  "id_estatus" : 1, // valor fijo,
  "id_estado": 22, // valor fijo
  // "id_persona_registro": -1, //En el caso de citas desde la web, debe ser el id  del paciente
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
  if(appointment.appointment) {
      appointment.appointment.fecha_hora_inicio = moment(appointment.appointment.fecha_hora_inicio);
  }
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

function AppointmentsRequest(locationID) {
  return {
    type: APPOINTMENTS_READ_REQUEST,
    payload : {locationID}
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

function DoctorDataRequest(payload) {
  return {
    type: DOCTOR_READ_REQUEST,
    payload
  }
}

function DoctorDataRequestSuccess(payload) {
  return {
    type: DOCTOR_READ_SUCCESS,
    payload
  }
}

function DoctorDataRequestFailure(error) {
  return {
    type: DOCTOR_READ_FAILURE,
    error
  }
}

function SelectedNewDate(newDate) {
  return {
    type: APPOINTMENT_NEW_DATE

  }
}

function VerifyAppointmentSuccess() {
  return {
    type: VERIFY_APPOINTMENT_SUCCESS
  }
}

function VerifyAppointmentFailure(error) {
  return {
    type: VERIFY_APPOINTMENT_FAILURE,
    error
  }
}

export function GetDoctorData(doctorUsername) {
  return dispatch => {
    dispatch(DoctorDataRequest(doctorUsername));
    axios.get('responsablesservicio/perfilpublico/' + doctorUsername)
    .then((data)=> {
        dispatch(DoctorDataRequestSuccess(data.data));
      }).catch((error) => {
        dispatch(DoctorDataRequestFailure(error))
      })
  }
}




export function SelectNewDate(newDate, doctorUsername, locationID) {

  let range = {
    minDate: moment(newDate).format("MM-DD-YYYY"),
    maxDate: moment(newDate).add('d',6).format("MM-DD-YYYY")
  }

  return dispatch => {
    dispatch(SelectedNewDate(newDate));
    dispatch(GetAppointments(doctorUsername, range, locationID))
  }
}

export function GetClosestAppointments(doctorUsername, locationID) {
    // Auxiliar function for notify Closest appointment available
    return axios.get('agenda/turnosdisponibles/' + doctorUsername + '/05-15-2016/11-15-2016' );
}

export function GetAppointments(doctorUsername, range, locationID) {
  //If a date range is specified.
  return dispatch =>{
    dispatch(AppointmentsRequest(locationID));
    if(range){
      axios.get('agenda/turnosdisponibles/' + doctorUsername + '/' + range.minDate + '/' + range.maxDate)
        .then((data)=> {
            if(locationID){
              data.data.forLocation = locationID
            }
            dispatch(AppointmentsRequestSuccess(data.data));
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

export function VerifyAppointment(confirmationId) {
  return dispatch => {
    axios.post('/solicitudes/verificar/' + confirmationId).then((data) => {
      dispatch(VerifyAppointmentSuccess(data));
    }).catch((error) => {
      dispatch(VerifyAppointmentFailure(error));
    });
  }
}


//Utils methods

function transformAppointment(appointment){
  let _dataToSend = DTO;
  const { solicitante, turno, location, institution } = appointment;
  const { doctor  } = turno;

  _dataToSend.nombre_persona_emisora = solicitante.nombre + ' ' +  solicitante.apellido;
  _dataToSend.nombre_persona_registro = solicitante.nombre + ' ' + solicitante.apellido;
  _dataToSend.solicitante = fillSolicitante(solicitante);
  _dataToSend.id_persona_registro = solicitante.id;
  _dataToSend.fecha_inicio = turno.fecha_hora_inicio.toDate();
  var _initialDate = turno.fecha_hora_inicio.clone();

  _dataToSend.fecha_fin = _initialDate.add('m', turno.duracion_en_minutos).toDate();

  _dataToSend.solicitante.id = solicitante.id;
  _dataToSend.id_responsable_servicio = doctor.id;
  _dataToSend.id_persona_emisora = solicitante.id;
  _dataToSend.solicitante.id_empresa = institution.id_empresa;
  _dataToSend.id_empresa = institution.id_empresa;
  _dataToSend.solicitante.id_responsable_servicio = doctor.id;
  _dataToSend.nombre_responsable_servicio = doctor.apellido + ' ' + doctor.nombre;

  _dataToSend.etapas_solicitud[0].id_localidad = location.id;
  _dataToSend.etapas_solicitud[0].nombre_localidad = location.nombre || 'Mock';

  _dataToSend.etapas_solicitud[0].fecha_inicio = _dataToSend.fecha_inicio;
  _dataToSend.etapas_solicitud[0].fecha_fin = _dataToSend.fecha_fin;

  return _dataToSend;

}

function fillSolicitante(solicitante){
  var _solicitante = {};
  var keys = Object.keys(DTO.solicitante)
  keys.map((key, i) => {
    if(solicitante[key]){
        _solicitante[key] = solicitante[key]
    }
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

// Remover cuando añadan la propiedad fecha_nacimiento al usuario que traemos por email
_solicitante.fecha_nacimiento = (solicitante.fecha_nacimiento.toISOString) ? solicitante.fecha_nacimiento.toISOString() : solicitante.fecha_nacimiento;
  _solicitante.localidades.push(_localidad);

  return _solicitante;
}
