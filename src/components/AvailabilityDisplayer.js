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
import { GetAppointments, SelectNewDate } from '../actions/Appointments';

import WeekDisplayer from './WeekDisplayer';

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);


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
      appointmentsForWeek : this.calculateAvailableAppointmentsForWeek(this.props.appointment.selectedDay, this.props.availability, true)
    };
  }

  renderWeekDisplayer(selectedDate, appointments){

    const { idLocalidad, appointment, doctor } = this.props;

    var _appointmentsForWeek = this.calculateAvailableAppointmentsForWeek(selectedDate, appointments, true)

    return (<WeekDisplayer appointmentsForWeek={_appointmentsForWeek}
                     selectedDay={this.state.selectedDay}
                     idLocalidad={idLocalidad} doctor={doctor}/>)
  }


  calculateAvailableAppointmentsForWeek(selectedDate, appointments, initial) {
     const { dispatch } = this.props;
      let min = selectedDate;
      let max = moment(selectedDate).add(6, 'd');
      if(initial) {
        return filterAppointmentsForWeek(selectedDate, appointments ,{min, max})
      }
  }

  render() {
    const { availability, appointment, idLocalidad, dispatch, doctor } = this.props;
    console.log(this.props);
    return(
      <div className="ui grid">
        <div className="ui column grid stackable container">
          <div className="ui five wide column">
            <DayPicker
              className="Availability"
              initialMonth={ this.state.initialMonth }
              fromMonth={ fromMonth }
              toMonth={ toMonth }
              onDayClick={ (e, day) => {
                    dispatch(SelectNewDate(day, appointment.doctorUsername, idLocalidad));
                    /*this.setState({
                      selectedDay : moment(day),
                      appointmentsForWeek : this.calculateAvailableAppointmentsForWeek(moment(day), availability)
                    });*/
                }
              }
            />
          </div>
          <div className="ui nine wide column grid stackable">
            <div className="ui column">
              { this.renderWeekDisplayer(appointment.selectedDay, availability)}
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
