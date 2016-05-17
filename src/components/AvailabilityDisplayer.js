/**
 * Created by epotignano on 13/4/16.
 */


import React, { Component, PropTypes} from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import "react-day-picker/lib/style.css";
import "../styles/dayPicker.scss";
import { connect } from "react-redux";
import _ from 'lodash';
import { GetAppointments, SelectNewDate, GetClosestAppointments } from '../actions/Appointments';

import WeekDisplayer from './WeekDisplayer';

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

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

    const { idLocalidad, availability, appointment, doctor, doctorUsername, dispatch } = this.props;

    var _datesToUse;

    appointment.responsable_servicio.localidades.some((localidad) =>{
      if(idLocalidad == localidad.id){
        _datesToUse = localidad.turnos
      }
    })


    var _appointmentsForWeek = this.calculateAvailableAppointmentsForWeek(selectedDate, _datesToUse, true);
    if(!this.state.showClosestAppointment){
      if(_appointmentsForWeek.length) {
        return (<WeekDisplayer appointmentsForWeek={_appointmentsForWeek}
                         selectedDay={selectedDate}
                         idLocalidad={idLocalidad} doctor={doctor}/>)
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
      }
    }else{
      return (<div onClick={ () => {
          this.setNewDate(this.state.closestAppointment.fecha_hora_inicio)
      }}>
        Proximo turno disponible {this.state.closestAppointment.fecha_hora_inicio}
      </div>)
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
    })

    dispatch(SelectNewDate(_day, appointment.doctorUsername, idLocalidad));
  }

  render() {
    const { availability, appointment, idLocalidad, doctor } = this.props;
    return(
      <div className="ui grid">
        <div className="ui column grid stackable container">
          <div className="ui five wide column">
            <DayPicker
              className="Availability"
              initialMonth={ this.state.month }
              fromMonth={ fromMonth }
              toMonth={ toMonth }
              onDayClick={ (e, day) => {
                  this.setNewDate(day);
                }
              }
            />
          </div>
          <div className="ui nine wide column grid stackable">
            <div className="ui column">
              { this.renderWeekDisplayer(this.state.selectedDate, availability)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AvailabilityDisplayer.propTypes = {
  availability : PropTypes.any,
  location: PropTypes.any,
  doctor: PropTypes.any
};

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

export default connect(mapStateToProps)(AvailabilityDisplayer);
