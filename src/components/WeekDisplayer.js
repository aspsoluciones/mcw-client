/**
 * Created by epotignano on 14/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TakeAppointment } from '../actions/Appointments';
import _ from 'lodash';
import moment from 'moment';
import ReactToolTip from 'react-tooltip';
moment.locale('es');
let numOfAppointments = 4;

function isSameDay(date1, date2) {
  var _stringDate = date1.format('YYYY-MM-DD');
  var _result = date2.fecha_hora_inicio.indexOf(_stringDate) != -1;
  return _result;
}


function retrieveSelectedLocation(idLocalidad, localidades) {
  let _localidad;
  localidades.some((localidad, index) => {
    if(localidad.id === idLocalidad) {
      _localidad = localidades[index];
      return true;
    }
  })

  return _localidad;
}

class WeekDisplayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      showExpandButton: false
    }
  }

   calculateWeekToDisplay(_day) {
    let _days = [];
    _days.push(_day);
    for (let i = 0; i < 6; i++) {
      var _d = moment(_day).add(i+1, 'd');
      _days.push(_d)
    }
    return _days;
  }

  assignAppointmentsToWeekDay(week, appointments) {
    console.log(week);
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

  selectAppointment(appointment){

    const {dispatch, doctor, idLocalidad, institution} = this.props;

    this.setState({
      selectedAppointment : appointment
    });

    appointment.institution = institution;
    appointment.doctor = doctor;

    dispatch(TakeAppointment({appointment}))
  }

  toggleExpand() {
     this.setState({
       expanded: !this.state.expanded
      })
  }

  showExpandButton(){
    this.setState({
      showExpandButton: true
    })
  }

  renderWeekDisplayer(){
    var _weekdays = this.calculateWeekToDisplay(this.props.selectedDay);
    var _weekWithTimes = this.assignAppointmentsToWeekDay(_weekdays, this.props.appointmentsForWeek);
    //console.log(_weekWithTimes);

    return(<div className="ui one column grid">
      <div className="ui one padded column">
        <table className="table ui simple-table unstackable table-week-displayer fixed">
          <thead>
          <tr>
            {
              _weekdays.map((day, i) => {
                return<th key={i}> {day.format("dddd")}</th>
              })
            }
          </tr>
          <tr>
            {
              _weekdays.map((day, i) => {
                return <th key={i}>{day.format("DD MMM")}</th>
              })
            }
          </tr>
          </thead>
          <tbody>
          <tr>
            {
              _weekWithTimes.map((day, i) => {
                if(day.times) {
                  if(Object.keys(day.times).length > numOfAppointments) this.state.showExpandButton = true;
                  return <td key={i}>
                    <div className="ui one column">
                      {
                        day.times.map((time, i) => {
                          const appoinmentTime = moment(time.fecha_hora_inicio).format("HH:mm");
                          const tooltipMessage = "Solicitar cita a las " + appoinmentTime;
                          return <div key={i} className="ui column">
                            {
                              !this.state.expanded ?
                                i < numOfAppointments
                                  ? <button  data-tip={tooltipMessage}  onClick={ () => this.selectAppointment(time, this.props.location) } className="ui circular small button bg-mcwBlue">{ appoinmentTime }</button>
                                  : null
                                : <button  data-tip={tooltipMessage} onClick={ () => this.selectAppointment(time, this.props.location) } className="ui circular small button bg-mcwBlue">{ appoinmentTime }</button>
                            }
                          </div>
                        })
                      }
                    </div>

                  </td>
                } else {
                  return <td key={i}>

                  </td>
                }
              })
            }
          </tr>
          </tbody>
        </table>
        {
          this.state.showExpandButton
            ? <button onClick={ () => this.toggleExpand() } className="ui fluid tiny button bg-mcwBlue uppercase m-v-lg">{!this.state.expanded ? 'ver más' : 'ver menos' }</button>
            : null
        }
      </div>

      <ReactToolTip type="info"/>
    </div>)
  }

  render() {

    return (
      this.renderWeekDisplayer()
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
  institution: PropTypes.any,
  idLocalidad: PropTypes.any,
  doctor: PropTypes.any
};


function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }

}

export default connect(mapStateToProps)(WeekDisplayer);
