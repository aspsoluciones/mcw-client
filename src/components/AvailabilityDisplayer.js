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

import WeekDisplayer from './WeekDisplayer';


const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

function calculateAvailableAppointmentsForWeek(selectedDate, appointments) {

    let min = selectedDate;
    let max = moment(selectedDate).add(6, 'd');

    console.log(min);
  console.log(max);
    return _.filter(appointments, function ProcessAppointment(appointment) {
      if( (min.utc() <= appointment.fecha_hora_inicio.utc())  &&  (appointment.fecha_hora_inicio.utc() <= max.utc())) {
        return appointment
      }
    });
}


class AvailabilityDisplayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: moment(),
      displayDay : moment(),
      appointmentsForWeek : calculateAvailableAppointmentsForWeek(moment(), this.props.availability)
    };
  }

  render() {
    const { availability } = this.props;

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
                  console.log(day);
                    this.setState({
                      selectedDay : moment(day),
                      appointmentsForWeek : calculateAvailableAppointmentsForWeek(moment(day), availability)
                    });
                }
              }
            />
          </div>
          <div className="ui nine wide column grid stackable">
            <div className="ui column">
              <WeekDisplayer appointmentsForWeek={this.state.appointmentsForWeek} selectedDay={this.state.selectedDay} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AvailabilityDisplayer.propTypes = {
  availability : PropTypes.any
};

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

export default connect(mapStateToProps)(AvailabilityDisplayer);
