/**
 * Created by epotignano on 28/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PatientCard from '../components/PatientCard';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

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
      selectedPatient: {},
      open: true
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  patientSelected = (patient) => {
    console.log(patient);
    this.setState({open: false});
  };

  render(){
    return(
    <Dialog
      title="Seleccione un paciente para solicitar la cita"
      modal={false}
      open={this.state.open}
    >
      <div className="ui link cards">
        {
          this.props.patientsList.map( (element, i) => {
            return <PatientCard key={i} patient={element} handleClick={() => { this.patientSelected(element) } }/>
          })
        }
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
