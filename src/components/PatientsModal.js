/**
 * Created by epotignano on 28/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PatientCard from '../components/PatientCard';
import Dialog from 'material-ui/lib/dialog';
import { selectPatient } from '../actions/PatientsActions';

class PatientsModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedPatient: {}
    }
  }

  patientSelected = (patient) => {
    const { dispatch } = this.props;
    dispatch(selectPatient(patient));
    this.setState({open: false});
  };

  renderPatientsCards(patientsList) {
    if(patientsList && patientsList.length){
      return patientsList.map( (element, i) => {
        return <PatientCard key={i} patient={element} handleClick={() => { this.patientSelected(element) } }/>
      })
    }
  }

  render(){
    return(
    <Dialog
      title="Seleccione un paciente para solicitar la cita"
      modal={false}
      open={(this.props.patients.hasOwnProperty("openModal")) ? this.props.patients.openModal : true}
    >
      <div className="ui link cards">
        {this.renderPatientsCards(this.props.patientsList)}
      </div>
    </Dialog>
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
