/**
 * Created by epotignano on 13/4/16.
 */


import React, { Component, PropTypes} from 'react';
import moment from 'moment';
class AvailabilityDisplayer extends Component {

  calculateNextAvailableAppointMent() {



  }


  constructor(props) {
    super(props);
    this.state = {
      today: moment()
    }
  }

  render() {

    const { availability } = this.props;

    return(
      <div className="ui grid">
        <div className="ui column">

        </div>


      </div>
    )
  }
}

AvailabilityDisplayer.propTypes = {
  availability : PropTypes.any
};

