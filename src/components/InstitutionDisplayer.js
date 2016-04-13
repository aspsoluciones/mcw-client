/**
 * Created by epotignano on 13/4/16.
 */

import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import AvailabilityDisplayer from '../components/AvailabilityDisplayer';

class InstitutionDisplayer extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectedAppointment: {}
    }
  }

  render() {

    const { institution } = this.props;

    return(
      <div className="ui segment">
        <div className="ui grid container">
          <div className="ui row">
            <div className="ui six wide column">
              <i className="large location arrow icon"/>
              { institution.name }
            </div>
            <div className="ui eight wide column">
              <AvailabilityDisplayer availability={institution.availability}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InstitutionDisplayer.propTypes = {
  institution : PropTypes.any
};

function mapStateToProps(state) {
  return state;
}

InstitutionDisplayer = connect(mapStateToProps)(InstitutionDisplayer);

export default InstitutionDisplayer;
