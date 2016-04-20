/**
 * Created by epotignano on 15/4/16.
 */

import {
 APPOINTMENT_FAILURE, APPOINTMENT_REQUEST, APPOINTMENT_SUCCESS, APPOINTMENT_SELECTED
} from '../constants/ActionTypes';

import axios from 'axios';

var _mockDTO = {
  "id_tipo_solicitud":20,
  "numero":null,
  "id_empresa":631033,
  "id_recurrencia":null,
  "id_area_sistema":null,
  "id_persona_solicitante":631087,
  "nombre_persona_solicitante":null,
  "id_tipo_responsable":null,
  "id_paciente":null,
  "nombre_paciente":null,
  "id_persona_emisora":631034,
  "nombre_persona_emisora":null,
  "id_responsable_servicio":631034,
  "nombre_responsable_servicio":null,
  "id_medico":null,
  "nombre_medico":null,
  "fecha_inicio":"2016-04-16T00:00:00",
  "fecha_finalizacion":"2017-04-16T00:00:00",
  "fecha_requerido":"2017-04-16T00:00:00",
  "comentario_emisor":"comentario emisor",
  "asunto_solicitud":"asunto solicitud",
  "id_solicitud_objeto":null,
  "numero_solicitud_objeto":null,
  "id_tipo_solicitud_objeto":null,
  "id_procedimiento":null,
  "id_contacto_clinico":null,
  "comentario_solicitud_cancelada":null,
  "id_persona_solicitud_cancelada":null,
  "fecha_solicitud_cancelada":null,
  "id_estatus":1,
  "id_estado":1,
  "id_persona_registro":631034,
  "nombre_persona_registro":"nombre persona registro",
  "id_persona_actualizacion":631034,
  "nombre_persona_actualizacion":null,
  "etapas_solicitud":[
    {
      "nombre_corto_solicitud":null,
      "id_area_sistema":null,
      "asunto":null,
      "id_concepto_venta":null,
      "id_procedimiento":null,
      "nombre_procedimiento":null,
      "id_contacto_clinico":null,
      "fecha_inicio_etapa_solicitud":"2016-04-16T00:00:00",
      "fecha_finalizacion_etapa_solicitud":null,
      "fecha_requerido_etapa_solicitud":"2016-04-16T00:00:00",
      "fecha_inicio_original":null,
      "fecha_finalizacion_original":null,
      "id_estado":1,
      "id_estatus":1,
      "nombre_estado":"nombre estado",
      "telefono_particular_solicitante":null,
      "telefono_laboral_solicitante":null,
      "telefono_celular_solicitante":null,
      "numero_cuadricula_solicitante":null,
      "numero_cedula_solicitante":null,
      "path_photo_solicitante":null,
      "id_propietario_etapa":631034,
      "comentario_estado":null,
      "prioridad":1,
      "nombre_etapa":"nombre etapa",
      "fecha_fin_ejecucion":"2016-04-16T00:00:00",
      "fecha_fin_extension":"2016-04-16T00:00:00",
      "tarea_tardia":false,
      "fecha_fin_interrupcion":"2016-04-16T00:00:00",
      "fecha_registro":"2016-04-16T00:00:00",
      "id_localidad":null,
      "nombre_localidad":null,
      "id_color_etapa":null,
      "nombre_color_etapa":null,
      "enviar_email":false,
      "numero_dias_envio_email":null,
      "email_destinatario":null,
      "fecha_inicio_por_hora_llegada":false,
      "id_tipo_etapa":1,
      "notificaciones":[
        {
          "minutos_previos_notificacion": 60,
          "id_tipo_envio_notificacion": 1
        }
      ],
      "id":null
    }
  ],
  "id":null
}

function AppointmentSelected(appointment) {
  return {
    type: APPOINTMENT_SELECTED,
    appointment
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

    axios.post('/solicitudes', _mockDTO).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    });



    dispatch(AppointmentRequest());
    // Error
    dispatch(AppointmentFailure());
    //Success
    dispatch(AppointmentSuccess());
  }
}

