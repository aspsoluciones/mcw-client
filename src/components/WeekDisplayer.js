/**
 * Created by epotignano on 14/4/16.
 */

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {TakeAppointment} from "../actions/Appointments";
import _ from "lodash";
import moment from "moment";
import ReactToolTip from "react-tooltip";
import AppointmentDayPicker from "./AppointmentDayPicker";
import {UserLanguage} from "../constants/Commons";

moment.locale('es');
let numOfAppointments = 4;

function isSameDay(date1, date2) {
  if(date1 && date2 && date2.fecha_hora_inicio.indexOf){
    var _stringDate = date1.format('YYYY-MM-DD');
    var _result = date2.fecha_hora_inicio.indexOf(_stringDate) != -1;
    return _result;
  }
}


function retrieveSelectedLocation(idLocalidad, localidades) {
  let _localidad;
  localidades.some((localidad, index) => {
    if(localidad.id === idLocalidad) {
      _localidad = localidades[index];
      return true;
    }
  });

  return _localidad;
}



const WeekDisplayerRow = ({weekDay, weekWithTime, index, expand, onClick}) => {

  const day = weekWithTime[index];

  return(<div className="ui column center aligned">

    <h3 className="ui column">{weekDay[index].format("ddd")}</h3>
    <h3 className="ui column">{weekDay[index].format("DD MMM")}</h3>
    <div className="ui one column centered grid">
      {
        day.times && day.times.map((time, i) => {
          const appoinmentTime =  (( localStorage.getItem(UserLanguage) || 'es-PA') == 'es-AR') ?  moment(time.fecha_hora_inicio).format("HH:mm") : moment(time.fecha_hora_inicio).format('h:mm a');
          const tooltipMessage = "Solicitar cita a las " + appoinmentTime;
          return <div key={i} className="fullWidth">
            {
              !expand ?
                i < numOfAppointments
                  ? <button  data-tip={tooltipMessage}  onClick={ () => onClick(time, location) } className="ui circular tiny button bg-mcwBlue mobileAppointmentButton">{ appoinmentTime }</button>
                  : null
                : <button  data-tip={tooltipMessage} onClick={ () => onClick(time, location) } className="ui circular tiny button bg-mcwBlue mobileAppointmentButton">{ appoinmentTime }</button>
            }
          </div>
        })
      }
    </div>
  </div>)


};

class WeekDisplayer extends Component {

  setNewWeek(){
    var _day;


    //dispatch(SelectNewDate(_day, appointment.doctorUsername, idLocalidad));
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showExpandButton: false,
      showFromWeekDay : 0,
      showUntilWeekDay: 3,
      showCalendar: false
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

    const {dispatch, doctor, idLocalidad, institution, doctorUsername } = this.props;
    const { router } = this.context;

    this.setState({
      selectedAppointment : appointment
    });

    appointment.institution = institution;
    appointment.doctor = doctor;

    dispatch(TakeAppointment({appointment}));
    router.push({
      pathname: '/webui/' + doctorUsername + '/appointment/checkout'
    });
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


  goToPrevious(payload){
    const { onDateChange } = this.props;
    if(this.state.showFromWeekDay == 4 && !payload.direct) {
      this.setState({
        showFromWeekDay: 0,
        showUntilWeekDay: 3
      })
    } else {
      const { selectedDay } = this.props;
      onDateChange(moment(selectedDay).subtract('d', 7));
    }
  }

  goToDate(day){
    const { onDateChange } = this.props;

    onDateChange(day);
  }

  goToNext(payload) {
    const { onDateChange } = this.props;
    if(this.state.showUntilWeekDay == 3 && !payload.direct){
      this.setState({
        showFromWeekDay: 4,
        showUntilWeekDay: 6
      })
    } else {
      const { selectedDay } = this.props;
      onDateChange(moment(selectedDay).add('d', 7))
    }

  }

  renderRow(weekdays, weekWithTimes, index){
      if(index  >= this.state.showFromWeekDay && index <= this.state.showUntilWeekDay){

        return <WeekDisplayerRow key={index}
                                 weekDay={weekdays}
                                 weekWithTime={weekWithTimes}
                                 index={index}
                                 onClick={this.selectAppointment.bind(this)}
                                 expand={this.state.expanded}
                                 location={this.props.location}
        />
      }
  }

  canGoBack(selectedDay){
    var _selectedDay = moment(selectedDay);
    var _today = moment();
    var _diff = _today.diff(_selectedDay, 'days');
    return _diff >= 0;
  }

  renderInternalCalendar(render){
    const { selectedDay, month } = this.props;

    if(render){
      return(<div className="ui row">
        <AppointmentDayPicker onClick={this.goToDate.bind(this)} selectedDate={selectedDay} month={month}></AppointmentDayPicker>
      </div>)
    }
    return null;
  }

  toggleCalendar(){

    this.setState({
      showCalendar: !this.state.showCalendar
    })

  }



  renderWeekDisplayer(){
    const { selectedDay } = this.props;
    let locale = (( localStorage.getItem(UserLanguage) || 'es-PA') == 'en-US') ? 'en': 'es';
    console.log(moment.locale());
    this.canGoBack(selectedDay);
    var _weekdays = this.calculateWeekToDisplay(selectedDay);
    var _weekWithTimes = this.assignAppointmentsToWeekDay(_weekdays, this.props.appointmentsForWeek);
    const classToApply = (this.state.showUntilWeekDay == 3) ? "ui sixteen wide four column centered grid": "ui sixteen wide three column centered grid";
    const leftButtonClass = (this.canGoBack(selectedDay) && this.state.showUntilWeekDay == 3) ? 'ui disabled  icon basic tiny button blue' : 'ui icon basic tiny button blue';

    return(<div className="ui one column grid">
      <div className="ui tablet only mobile only row">
        <div className="ui grid three column centered">
          <div className="ui left aligned column">
            <div className="left floated six wide column">
              <button className={leftButtonClass} onClick={this.goToPrevious.bind(this)}>
                <i className="left chevron icon"></i>
              </button>
            </div>
          </div>
          <div className="ui middle aligned column grid">
            <div className="ui column">
              <button className="ui right icon button basic tiny blue" onClick={this.toggleCalendar.bind(this)}>
                {selectedDay.locale(locale).format('MMMM').toUpperCase()}
              </button>
            </div>
          </div>

          <div className="ui right aligned column">
            <div className="right floated six wide column">
              <button className="ui icon button basic tiny blue" onClick={this.goToNext.bind(this)}>
                <i className="right chevron icon"></i>
              </button>
            </div>
          </div>

        { this.renderInternalCalendar(this.state.showCalendar) }

        </div>

        <div className={classToApply}>
          {
            _weekdays.map((day, index)=>{
              return this.renderRow(_weekdays, _weekWithTimes, index)
            })
          }
          {
            this.state.showExpandButton
              ? <button onClick={ () => this.toggleExpand() } className="ui fluid tiny button bg-mcwBlue uppercase m-v-lg">{!this.state.expanded ? 'ver más' : 'ver menos' }</button>
              : null
          }
        </div>
      </div>


      <div className="ui computer only one padded column" >
        <table className="table ui simple-table unstackable table-week-displayer fixed">
          <thead>
          <tr>
            <th>
              <button className={leftButtonClass} onClick={()=> {this.goToPrevious({direct: true})}}>
                <i className="left chevron icon"></i>
              </button>
            </th>
            {
              _weekdays.map((day, i) => {
                return<th key={i}> {day.locale(locale).format("dddd")}</th>
              })
            }

             <th>
                <button className="ui icon basic tiny button blue" onClick={()=> {this.goToNext({direct: true})} }>
                  <i className="right chevron icon"></i>
                </button>
              </th>
          </tr>
          <tr>
            <th></th>
            {
              _weekdays.map((day, i) => {
                return <th key={i}>{day.locale(locale).format("DD MMM")}</th>
              })
            }
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td></td>
            {
              _weekWithTimes.map((day, i) => {
                if(day.times) {
                  if(Object.keys(day.times).length > numOfAppointments) this.state.showExpandButton = true;
                  return <td key={i}>
                    <div className="ui one column">
                      {
                        day.times.map((time, i) => {
                          const appoinmentTime = (( localStorage.getItem(UserLanguage) || 'es-PA') == 'es-AR') ? moment(time.fecha_hora_inicio).format("HH:mm") : moment(time.fecha_hora_inicio).format('h:mm a');
                          const tooltipMessage = this.props.languageJson.request_appointment_at + " " +  appoinmentTime;
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
            <td></td>
          </tr>
          </tbody>
        </table>
        {
          this.state.showExpandButton
            ? <button onClick={ () => this.toggleExpand() } className="ui fluid tiny button bg-mcwBlue uppercase m-v-lg">{!this.state.expanded ? this.props.languageJson.view_more : this.props.languageJson.view_less }</button>
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
  doctor: PropTypes.any,
  onDateChange : PropTypes.func,
  languageJson: PropTypes.any
};


function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }

}

export default connect(mapStateToProps)(WeekDisplayer);
