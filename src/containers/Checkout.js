/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { FormsyText, FormsySelect, FormsyDate } from 'formsy-material-ui';
import { ConfirmAppointment } from '../actions/Appointments';
import { getPatientByEmail, selectPatient, patientSelectModal, fillPatientData} from '../actions/PatientsActions';
import PatientsModal from '../components/PatientsModal';
import PatientCard from '../components/PatientCard';

Formsy.addValidationRule('isRequiredIfNotValue', function (values, value, otherField) {
  if(value || values[otherField]) {
    return true;
  }
});

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPatientModal : false
    }
  }

  openModal() {
    const { dispatch } = this.props;
    dispatch(patientSelectModal())
  }

  submitAppointment(data) {
    const { dispatch, appointment } = this.props;
    const { keep } = appointment;
    //TODO Transformations for adapt the object to the DTO for Appointments
    dispatch(ConfirmAppointment({
      solicitante : data,
      turno: keep.appointment,
      location: keep.appointment.location,
      doctor: keep.appointment.doctor
    }));
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  checkUser(userEmail) {
    const { dispatch } = this.props;
    dispatch(getPatientByEmail(userEmail));
  }

  reOpenPatientsModal(){
    const { dispatch } = this.props;
    dispatch(patientSelectModal())
  }

  reRenderForm() {
    const { dispatch } = this.props;
    dispatch(fillPatientData())
  }

  render() {

    const { appointment, patients } = this.props;
    const { keep } = appointment;
    let _modal = (this.state.openPatientModal) ? <PatientsModal patientsList={patients.patient}/> : null;
    let _form = (
      <Formsy.Form ref="appointmentForm" className="ui large form"
                   onValid={this.enableButton.bind(this)}
                   onInvalid={this.disableButton.bind(this)}
                   onValidSubmit={this.submitAppointment.bind(this)}
      >
        <div className="row ui">
          <div className="ui one column grid">
            <div className="ui column">

              <FormsyText
                name='email_particular'
                hintText="Email"
                required
                value=""
                onChange={(e, value) => this.checkUser(value)}
              />
            </div>
            <div className="ui column">
              <FormsyText
                name='nombre'
                hintText="Nombre"
                required
                value=""
              />
            </div>

            <div className="ui column">
              <FormsyText
                name='apellido'
                hintText="Apellido"
                required
                value=""
              />
            </div>
              <FormsyDate
               name="fecha_nacimiento"
               floatingLabelText="Fecha"
             />
            <div className="ui column">
              <FormsySelect
                name="sexo"
                required
                floatingLabelText="Sexo"
                menuItems={this.selectFieldItems}
              >
                <MenuItem value={'M'} primaryText="Masculino" />
                <MenuItem value={'F'} primaryText="Femenino" />
              </FormsySelect>
            </div>
            <div className="ui column">
              <FormsyText
                name='numero_tel_celular'
                hintText="Número de teléfono celular"
                validations="isRequiredIfNotValue:numero_tel_particular"
                value=""
              />
            </div>
            <div className="ui column">
              <FormsyText
                name='numero_tel_particular'
                hintText="Número de teléfono particular"
                validations="isRequiredIfNotValue:numero_tel_celular"
              />
            </div>
            <div className="ui column">
              <FormsyText
                name='note'
                hintText="Notas"
                value=""
              />
            </div>

          </div>
          <div className="column">
            <button type="submit" className="ui button fluid blue">
              Solicitar cita
            </button>
          </div>
        </div>
      </Formsy.Form>);

    let _changePatientButton = (patients.patient && patients.patient.length > 1) ? (<button onClick={this.reOpenPatientsModal.bind(this)}>
        Cambiar paciente
    </button>) : null;

    let _selectedPatientCard = (
      <div>
        <div className="ui two columns grid">
          <div className="column">
            <PatientCard patient={patients.selectedPatient}/>
          </div>
          <div className="column">
            {_changePatientButton}
            <button onClick={this.reRenderForm.bind(this)}>
              Cambiar email
            </button>
          </div>
        </div>

        <div className="ui column">
          <button onClick={() => this.submitAppointment(patients.selectedPatient)} className="ui button fluid blue">
            Solicitar cita
          </button>
        </div>
      </div>
    );

    var _render = (patients.selectedPatient) ? _selectedPatientCard : _form;

    return (
      <div className="ui one column grid">
        <div className="ui one column grid segment">
          <div className="ui column">
            <div>
              Fecha: {keep.appointment.fecha_hora_inicio.format("dddd DD MMMM YYYY")}
            </div>
            <div>
              Horario: {keep.appointment.fecha_hora_inicio.format("HH:mm")}
            </div>
            <div>
              Duración: { keep.appointment.duracion_en_minutos} minutos
            </div>
          </div>
        </div>

        <div className="ui one column grid segment">
          { _render }
          <PatientsModal patientsList={patients.patient}/>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { appointment, patients } = state;
  return {
    appointment,
    patients
  }
}

Checkout.propTypes = {
  dispatch : PropTypes.any
}

Checkout.contextTypes = {
  store: PropTypes.any
};

Checkout.stateTypes = {
  keep: PropTypes.any,
  doctor: PropTypes.any
};

export default connect(mapStateToProps)(Checkout);
