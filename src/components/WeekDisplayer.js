/**
 * Created by epotignano on 14/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TakeAppointment } from '../actions/Appointments';
import _ from 'lodash';
import moment from 'moment';


function isSameDay(date1, date2) {
  var _stringDate = date1.format('YYYY-MM-DD');
  var _result = date2.fecha_hora_inicio.indexOf(_stringDate) != -1;
  return _result;
}

class WeekDisplayer extends Component {

   calculateWeekToDisplay(_day) {
    let _days = [];
    _days.push(_day);
    for (let i = 0; i < 6; i++) {
      var _d = moment(_day).add(1+i, 'd');
      _days.push(_d)
    }
    return _days;
  }


  assignAppointmentsToWeekDay(week, appointments) {

    var _weekWithTimes = [{}, {}, {}, {}, {}, {}, {}];

      week.map(function ProcessWeekDay(weekDay, i){
        _.filter(appointments, (appointment) => {
          if(isSameDay(weekDay, appointment)) {


           if(!_weekWithTimes[i].times) {
             _weekWithTimes[i].times = [];
           }

            _weekWithTimes[i].date = weekDay;
            _weekWithTimes[i].times.push(appointment);
          }
        })
      });

    return _weekWithTimes;
  }


  selectAppointment(appointment, location){

    const {dispatch, doctor} = this.props;

    this.setState({
      selectedAppointment : appointment
    });

    appointment.location = location;
    appointment.doctor = doctor

    dispatch(TakeAppointment({appointment}))
  }

  render() {
    var _weekdays = this.calculateWeekToDisplay(this.props.selectedDay);
    var _weekWithTimes = this.assignAppointmentsToWeekDay(_weekdays, this.props.appointmentsForWeek);
    console.log(_weekWithTimes);

    return (
      <div className="ui one column grid">
        <div className="ui column">
          <h3>Month</h3>
        </div>
        <div className="ui one padded column">
          <table className="ui table simple-table unstackable">
            <thead>
            <tr>
              {
                _weekdays.map((day, i) => {
                  return<th> {day.format("dddd")}</th>
              })
              }
            </tr>
            <tr>
              {
                _weekdays.map((day, i) => {
                  return <th>{day.format("DD MMM")}</th>
                })
              }
            </tr>
            </thead>
            <tbody>
              <tr>
                {
                  _weekWithTimes.map((day, i) => {
                    if(day.times) {
                      return <td>
                        <div className="ui one column grid">
                          {
                            day.times.map((time) => {
                              return <div className="ui column">
                                <button onClick={ () => this.selectAppointment(time, this.props.location) } className="ui button">{ moment(time.fecha_hora_inicio).format("HH:mm")}</button>
                              </div>
                            })
                          }
                        </div>

                      </td>
                    } else {
                      return <td>

                      </td>
                    }
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

WeekDisplayer.stateTypes = {
  selectedDay : PropTypes.any,
  appointmentsForWeek: PropTypes.any,
  selectedAppointment: PropTypes.any
};

WeekDisplayer.contextTypes = {
  dispatch : PropTypes.any,
  router : PropTypes.any
};

WeekDisplayer.propTypes = {
  location: PropTypes.any,
  doctor: PropTypes.any
};

export default connect()(WeekDisplayer);
