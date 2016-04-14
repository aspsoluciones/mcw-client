/**
 * Created by epotignano on 13/4/16.
 */


import React, { Component, PropTypes} from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import "react-day-picker/lib/style.css";
import "../styles/dayPicker.scss";
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

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
  return (
    <form className="DayPicker-Caption">
      <div>
        <SelectField value={date.getMonth()} onChange={monthChange}>
          { months.map((month, i) =>
            <MenuItem value={i} primaryText={month} key={i}/>)}
        </SelectField>
        <SelectField maxHeight={300} onChange={ yearChange } value={ 2016 }>
          { years.map((year, i) =>
            <MenuItem key={ i } primaryText={ year } key={i}/>)}
        </SelectField>
      </div>
    </form>
  )
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

  render() {
    const { availability } = this.props;

    return(
      <div className="ui grid">
        <div className="ui column grid stackable container">
          <div className="ui eight wide column">
            <DayPicker
              className="Availability"
              initialMonth={ this.state.initialMonth }
              fromMonth={ fromMonth }
              toMonth={ toMonth }
              onDayClick={ (e, day) => alert(day) }
            />
          </div>
          <div className="ui eight wide column grid stackable">
            <div className="ui column">
                <div className="ui one column center aligned grid">
                  <div className="ui column">
                    <h4>
                      { this.state.displayDay.format('dddd')}
                    </h4>
                  </div>
                  <div className="ui column">
                    <h1>
                      { this.state.displayDay.format('d')}
                    </h1>
                  </div>
                  <div className="ui column">
                    <h3>
                      { this.state.displayDay.format('MMMM')}
                    </h3>
                  </div>
                </div>
              <div className="ui column">
                <h4 className="ui center aligned header">Horarios disponibles</h4>
              </div>
               <div className="ui three column grid">
                  { availability[0].times.map((time, i) => {
                      return <a  className="ui column" key={i}>{time}</a>
                    })
                  }
              </div>

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
