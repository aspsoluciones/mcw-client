/**
 * Created by epotignano on 14/4/16.
 */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';

var style = {



}


class WeekDisplayer extends Component {

   calculateWeekToDisplay(_day) {
    var _days = [];
    _days.push(_day);

    for (var i = 0; i < 6; i++) {
      var _d = moment(_day).add(1+i, 'd');
      _days.push(_d)
    }

    console.log(_days);
    return _days;
  }

  render() {
    console.log('render');
    console.log(this);
    var _weekdays = this.calculateWeekToDisplay(this.props.selectedDay);

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
                  return <th key={i}>{ day.format('dddd') }</th>
              })
              }
            </tr>
            <tr>
              {
                this.props.appointmentsForWeek.map((day, i) => {
                  return <th key={i} className="centered-cell">
                    <div>
                      { day.date.format('DD MMM') }
                    </div>
                  </th>
                })
              }
            </tr>
            </thead>
            <tbody>
              <tr>
                {
                  this.props.appointmentsForWeek.map((day, i) => {
                    return <td key={i}>
                      { day.times.map((time, j) => {
                        return <div class="ui column">
                          <button className="ui button compact" key={j}> {time}</button>
                      </div>
                      })}
                    </td>
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
  appointmentsForWeek: PropTypes.any
};

export default WeekDisplayer;

