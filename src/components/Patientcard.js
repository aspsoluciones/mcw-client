/**
 * Created by epotignano on 29/4/16.
 */

import React, { Component, PropTypes} from 'react';

class PatientCard extends Component {

  clickHandler() {
    this.props.handleClick(this.props.patient);
  }

  render() {
    const { patient  } = this.props;

    return(
      <div onClick={ this.clickHandler.bind(this) } className="ui card">
        <div className="ui one column centered grid content">
          <i className="user massive icon"/>
        </div>
        <div className="extra content">
          <div className="header">{patient.nombre} {patient.apellido}</div>
        </div>
      </div>
    )
  }
}


PatientCard.propTypes = {
  handleClick : PropTypes.func,
  patient: PropTypes.any
};

export default PatientCard;

