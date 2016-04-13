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
        <div className="ui grid stackable container">
          <div className="ui row">
            <div className="ui column">
              <h1 className="ui blue header inverted">
                { institution.name }
              </h1>
            </div>
          </div>
          <div className="ui row">
            <div className="ui column grid">
              <div className="ui column">
                <AvailabilityDisplayer availability={institution.availability}/>
              </div>
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
