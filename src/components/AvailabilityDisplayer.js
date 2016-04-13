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

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
    years.push(i);
  }

  const handleChange = function(event, index, value) {
    const { year, month } = event.target.form;
    onChange(new Date(year.value, month.value));
  }

  return (
    <form className="DayPicker-Caption">
      <SelectField value={date.getMonth()} onChange={handleChange}>
        { months.map((month, i) =>
          <MenuItem value={i} primaryText={month}/>)}
      </SelectField>
      <SelectField maxHeight={300} onChange={ handleChange } value={ date.getFullYear() }>
        { years.map((year, i) =>
          <MenuItem key={ i } primaryText={ year }/>)}
      </SelectField>
    </form>
  )
}


class AvailabilityDisplayer extends Component {
  calculateNextAvailableAppointMent() {

  }

  constructor(props) {
    super(props);
    this.state = {
      today: moment(),
      selectedDay: moment()
    }
  }

  render() {
    const { availability } = this.props;

    return(
      <div className="ui grid">
        <div className="ui column">
          <div className="ui eight wide column">
            <DayPicker
              className="Availability"
              canChangeMonth={false}
              initialMonth={ this.state.initialMonth }
              fromMonth={ fromMonth }
              toMonth={ toMonth }
              captionElement={
                <YearMonthForm onChange={ initialMonth => this.setState({ initialMonth }) } />
              }
            />
          </div>
          <div className="ui eight wide column">
            <h3 className="ui header">
              Selected day here
            </h3>
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
