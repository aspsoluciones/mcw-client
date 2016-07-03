/**
 * Created by epotignano on 13/4/16.
 */


import React, { Component, PropTypes} from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import _ from 'lodash';
import Loader from '../components/Loader';
import { GetAppointments, SelectNewDate, GetClosestAppointments } from '../actions/Appointments';

import AppointmentDayPicker from './AppointmentDayPicker';
import WeekDisplayer from './WeekDisplayer';

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);
import 'moment/locale/es';

//Pasar esto a un state si se requiere poder cambiar de idioma.
const locale = 'es';
function getFirstAppointmentAvailableForLocation(appointment, idLocalidad) {
  if(appointment){
    var _appointment = {'fecha_hora_inicio': moment(appointment)};
  }

  return _appointment;
}

function filterAppointmentsForWeek(selectedDay, appointments, range) {
  return _.filter(appointments, function ProcessAppointment(appointment) {
    if( (range.min.hour(0).minutes(0).seconds(0) <= moment(appointment.fecha_hora_inicio).utc())  &&  (moment(appointment.fecha_hora_inicio).utc() <= range.max.hour(23).minutes(59).seconds(59))) {
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

  componentDidMount(){

  }

  componentWillMount(){
  
  }

  componentDidUpdate(){

  }

  renderWeekDisplayer(selectedDate, appointments){

    const { idLocalidad, institution, availability, appointment, doctor, doctorUsername, dispatch, user } = this.props;
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
                         month={this.state.month}
                         institution={institution}
                         idLocalidad={idLocalidad}
                         onDateChange={this.setNewDate.bind(this)}
                         doctorUsername={doctorUsername}
                         doctor={doctor}
                         languageJson={this.props.user.languageJson}/>

        )
      } else if(!appointment.loadingAppointments &&
        !appointment.loadingDoctorData && 
        !_appointmentsForWeek.length && appointment.readSuccess
      ) {

        GetClosestAppointments(appointment.responsable_servicio.id, idLocalidad, selectedDate).then((data) => {
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
        return (
          <div className="ui middle aligned column centered container grid fullHeight">
            <div className="ui column">
              <div className="ui icon info message" onClick={ () => {
            this.setNewDate(this.state.closestAppointment.fecha_hora_inicio)}}>
                <i className="idea icon"></i>
                <div className="content">

                  <span>
                    {this.props.user.languageJson.closest_available_appointment} {moment(this.state.closestAppointment.fecha_hora_inicio).format("dddd DD/MMMM/YYYY")}
                  </span>
                
                </div>
              </div>
            </div>
          </div>
          )

      } else {
        return (
          <div className="ui middle aligned column centered container grid fullHeight">
            <div className="ui column">
              <div className="ui icon warning message">
                <i className="warning sign icon"></i>
                <div className="content">
                  <span>Span</span>
                </div>
              </div>
            </div>
          </div>

          )
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

    dispatch(SelectNewDate(_day, appointment.responsable_servicio.id, idLocalidad));
  }

  render() {
    const { availability, appointment, idLocalidad, doctor } = this.props;
    const { selectedDate } = this.state;
    // (this.state.closestAppointment && this.state.closestAppointment.fecha_hora_inicio)
    return(
      <div className="ui column availabilityDisplayer">
        <div className="ui two column stackable grid">
          <div className="ui computer only four wide column">
            <div className="ui one column computer only">
              <AppointmentDayPicker
              onClick={this.setNewDate.bind(this)}
              month={this.state.month}
              selectedDate={this.state.selectedDate}/>
            </div>
          </div>
          <div className="ui twelve wide computer only sixteen wide column mobile tablet only" style={{minHeight:200}}>
            { this.renderWeekDisplayer(this.state.selectedDate, availability)}
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
  doctor: PropTypes.any,
  languageJson: PropTypes.any
};

AvailabilityDisplayer.contextTypes = {
  router : PropTypes.any
};

function mapStateToProps(state) {
  const { appointment, user } = state;
  return {
    appointment, user
  }
}

export default connect(mapStateToProps)(AvailabilityDisplayer);

// <div className="ui sixteen wide column mobile tablet only" style={{minHeight:200}}>
//             <div>
//               { this.renderWeekDisplayer(this.state.selectedDate, availability)}
//             </div>
//           </div>
