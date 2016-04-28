/**
 * Created by epotignano on 28/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class PatientsModal extends Component {
  componentDidMount() {
    this.showModal();
  }

  selectPatient(patient) {
    console.log(patient);
    this.setState({
      selectedPatient: patient
    })
  }

  showModal() {
    var _modal = $('.ui.modal')
      .modal({
        onDeny    : function(){
          window.alert('Wait not yet!');
          return false;
        },
        onApprove : function() {
          window.alert('Approved!');
        }
      }).modal('show');
  }

  constructor(props){
    super(props);
    this.state = {
      selectedPatient: {}
    }
  }

  render(){
    return(
      <div className="ui modal">
        <div className="content">
          {
            this.props.patientsList.map( (element, i) => {
              return <button key={i} onClick={this.selectPatient.bind(this)}
                             className="ui button primary" key={i}>{element.nombre}</button>
            })
          }
        </div>
        <div className="actions">
          <div className="ui deny button">Cancel</div>
          <div className="ui positive button">OK</div>
        </div>
      </div>
    )
  }
}

PatientsModal.propTypes = {
  patientsList: PropTypes.any
};


function mapStateProps(state) {
  const { patients } = state;
  return {
    patients
  };
}

export default connect(mapStateProps)(PatientsModal);
