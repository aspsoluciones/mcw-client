/**
 * Created by epotignano on 13/4/16.
 */


import React, { Component, PropTypes} from 'react';
import moment from 'moment';
import DayPicker,{DateUtils} from 'react-day-picker';
import "react-day-picker/lib/style.css";
import "../styles/dayPicker.scss";
import { connect } from "react-redux";
import _ from 'lodash';
import Loader from '../components/Loader';
import { GetAppointments, SelectNewDate, GetClosestAppointments } from '../actions/Appointments';
import MomentLocaleUtils from 'react-day-picker/moment';

import WeekDisplayer from './WeekDisplayer';

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);
import 'moment/locale/es';

//Pasar esto a un state si se requiere poder cambiar de idioma.
const locale = 'es';
function getFirstAppointmentAvailableForLocation(locations, idLocalidad) {
  let _appointment;
  locations.some((localidad)=>{
    if(idLocalidad == localidad.id_localidad){
      _appointment = localidad.turnos[0];
      return true;
    }
  })

  return _appointment;

}

function filterAppointmentsForWeek(selectedDay, appointments, range) {
  return _.filter(appointments, function ProcessAppointment(appointment) {
    if( (range.min.utc() <= moment(appointment.fecha_hora_inicio).utc())  &&  (moment(appointment.fecha_hora_inicio).utc() <= range.max.utc())) {
      return appointment
    }
  });
}

function smallerThanToday(day) {
    return new Date() >= day;
}

class AvailabilityDisplayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayDay : moment(),
      appointmentsForWeek : this.calculateAvailableAppointmentsForWeek(moment(), this.props.availability, true),
      selectedDate: moment()
    };
  }

  renderWeekDisplayer(selectedDate, appointments){

    const { idLocalidad, institution, availability, appointment, doctor, doctorUsername, dispatch } = this.props;
    const { loadingAppointmentsForLocation, loadingAppointments } = appointment;

    if(loadingAppointmentsForLocation == idLocalidad || loadingAppointments){
      return (<Loader inverted={true} loaderText="Leyendo..."/>);
    }
    var _datesToUse;

    appointment.responsable_servicio.localidades.some((localidad) =>{
      if(idLocalidad == localidad.localidad.id){
        _datesToUse = localidad.turnos
      }
    });

    var _appointmentsForWeek = this.calculateAvailableAppointmentsForWeek(selectedDate, _datesToUse, true);
    if(!this.state.showClosestAppointment){
      if(_appointmentsForWeek.length) {
        return (<WeekDisplayer appointmentsForWeek={_appointmentsForWeek}
                         selectedDay={selectedDate}
                         institution={institution}
                         idLocalidad={idLocalidad}
                         onDateChange={this.setNewDate.bind(this)}
                         doctor={doctor}/>

        )
      } else if(!appointment.loadingAppointments &&
        !appointment.loadingDoctorData &&
        !_appointmentsForWeek.length && appointment.readSuccess
      ) {
        GetClosestAppointments(doctorUsername, idLocalidad).then((data) => {
          let _closest =  getFirstAppointmentAvailableForLocation(data.data, idLocalidad);
          this.setState({
            showClosestAppointment: true,
            closestAppointment : _closest,
            availability : _closest
          });
        });

        return (<Loader inverted={true} loaderText="Leyendo..."></Loader>)
      }
    }else{
      if(this.state.closestAppointment && this.state.closestAppointment.fecha_hora_inicio){
        return (<div className="ui icon info message" onClick={ () => {
          this.setNewDate(this.state.closestAppointment.fecha_hora_inicio)
      }}>
      <i className="idea icon"></i>
       <div className="content">
         Proximo turno disponible {moment(this.state.closestAppointment.fecha_hora_inicio).format("dddd DD/MMM/YYYY")}
       </div>
      </div>)
      } else {
        return (<div className="ui column">
          <h2>Aún no se han registrado turnos en esta localidad</h2>
        </div>)
      }
    }

  }

  calculateAvailableAppointmentsForWeek(selectedDate, appointments, initial) {
     const { dispatch } = this.props;
      let min = selectedDate;
      let max = moment(selectedDate).add(6, 'd');
      if(initial) {
        return filterAppointmentsForWeek(selectedDate, appointments ,{min, max})
      }
  }

  setNewDate(day) {
    var _day = moment(day);
    const { appointment, idLocalidad, dispatch } = this.props;

    this.setState({
      selectedDate : _day,
      month: _day.toDate(),
      showClosestAppointment: false
    });

    dispatch(SelectNewDate(_day, appointment.doctorUsername, idLocalidad));
  }



  render() {
    const { availability, appointment, idLocalidad, doctor } = this.props;
    return(
      <div className="ui column availabilityDisplayer">
        <div className="ui two column stackable grid">
          <div className="ui computer only four wide column">
            <div className="ui one column computer only ">
              <DayPicker
                locale={locale}
                localeUtils={MomentLocaleUtils}
                className="Availability"
                initialMonth={ this.state.month }
                disabledDays={DateUtils.isPastDay}
                onDayClick={ (e, day, { disabled, selected }) => {
                  if(!disabled){
                    this.setNewDate(day);
                  }
                }
              }
              />
            </div>

          </div>
          <div className="ui eleven wide column">
            <div className="ui one column grid">
              { this.renderWeekDisplayer(this.state.selectedDate, availability)}
            </div>
          </div>
        </div>
      </div>
    )}

}

AvailabilityDisplayer.propTypes = {
  availability : PropTypes.any,
  institution: PropTypes.object,
  idLocalidad: PropTypes.any,
  doctorUsername: PropTypes.string,
  doctor: PropTypes.any
};

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

export default connect(mapStateToProps)(AvailabilityDisplayer);
