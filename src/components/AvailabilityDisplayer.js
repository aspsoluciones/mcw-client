/**
 * Created by epotignano on 13/4/16.
 */


import React, { Component, PropTypes} from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import "react-day-picker/lib/style.css";
import "../styles/dayPicker.scss";

import WeekDisplayer from './WeekDisplayer';


const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

function YearMonthForm({ date, localeUtils, onChange }) {

  const months = localeUtils.getMonths();
  let _month = 4;
  let _year = 2016;
  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
    years.push(i);
  }

  console.log(years);

  const yearChange = function(event, index, value) {
    //TODO repensar
    _year = years[index];

    onChange(new Date(_year, _month));
  }

  const monthChange = function(event, index, value) {
    _month = value;
    onChange(new Date(_year, _month));
  }
}

var _timesDisplayer = function() {

}



class AvailabilityDisplayer extends Component {
  calculateNextAvailableAppointMent() {

  }

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: moment(),
      displayDay : moment()
    }
  }

  calculateWeek(){

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
                      selectedDay : moment(day)
                    })
                }
              }
            />
          </div>
          <div className="ui nine wide column grid stackable">
            <div className="ui column">
              <WeekDisplayer appointmentsForWeek={{'foo':'bar'}} selectedDay={this.state.selectedDay} />
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

export default AvailabilityDisplayer;
