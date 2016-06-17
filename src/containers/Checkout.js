/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppointmentSuccess from '../components/Appointments/AppointmentSuccess';
import { FormsyText, FormsySelect, FormsyDate } from 'formsy-material-ui';
import { ConfirmAppointment } from '../actions/Appointments';
import { getPatientByEmail, selectPatient, patientSelectModal, fillPatientData, createNewPatientWithSameEmail} from '../actions/PatientsActions';
import PatientsModal from '../components/PatientsModal';
import PatientCard from '../components/PatientCard';
import DoctorBadge from '../components/Doctor/DoctorBadge';
import DoctorPatientsType from '../components/Doctor/DoctorPatientsType';
import DoctorLanguages from '../components/Doctor/DoctorLanguages';
import DoctorName from '../components/Doctor/DoctorName';

Formsy.addValidationRule('isRequiredIfNotValue', function (values, value, otherField) {
  if(value || values[otherField]) {
    return true;
  }
});

function selectValue(state){
  return state.patients.resetForm;
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPatientModal : false,
      canSubmit: false
    }
  }

  componentDidMount(){
    const { store } = this.context;
    const { appointmentForm } = this.refs;
    let currentValue;
    store.subscribe(()=>{
      let previousValue = currentValue;
      currentValue = selectValue(store.getState());
      if(!previousValue && currentValue && appointmentForm){
        appointmentForm.reset();
      }
    })
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
      location: keep.appointment.institution.localidad,
      institution: keep.appointment.institution,
      doctor: keep.appointment.doctor
    }));
  }

  addPatientToMail(){
    const { dispatch } = this.props;
    dispatch(createNewPatientWithSameEmail());
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
    const { dispatch, appointment } = this.props;
    const { keep } = appointment;
    dispatch(getPatientByEmail(userEmail, keep.appointment.institution.id_empresa));
  }

  reOpenPatientsModal(){
    const { dispatch } = this.props;
    dispatch(patientSelectModal())
  }

  reRenderForm() {
    const { dispatch } = this.props;
    dispatch(fillPatientData())
  }

  renderForm(setDisabled){
      var _render = null;
      let _form = (
      <div className="ui column">
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
              floatingLabelText="Fecha de nacimiento"
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
          <div className="ui column">
            <button type="submit" disabled={setDisabled} className="ui button fluid blue">
              Solicitar cita
            </button>
          </div>
        </div>
      </Formsy.Form>
      
      
      </div>

      );

    return _form;
  }

  render() {

    const { appointment, patients } = this.props;
    const { keep } = appointment;
    let _modal = (this.state.openPatientModal) ? <PatientsModal patientsList={patients.patient}/> : null;
    const setDisabled = (!patients.selectedPatient && !this.state.canSubmit) || appointment.requestingAppointment
    
    let _changePatientButton = (patients.patient && patients.patient.length > 1) ? (<button className="ui button fluid blue" onClick={this.reOpenPatientsModal.bind(this)}>
        Cambiar paciente 1
    </button>) : null;   

    let _selectedPatientCard = (
      <div>
        <div className="ui two columns grid">
          <div className="column">
            <PatientCard patient={patients.selectedPatient}/>
          </div>
          <div className="column">
            {_changePatientButton}
            <button className="ui button fluid blue" onClick={this.reRenderForm.bind(this)}>
              Cambiar email
            </button>
            <button className="ui button fluid blue" onClick={this.addPatientToMail.bind(this)}>
              Crear nuevo paciente con el mismo email
            </button>
          </div>
        </div>

        <div className="ui column">
          <button onClick={() => this.submitAppointment(patients.selectedPatient)} disabled={ setDisabled  } className="ui button fluid blue">
            Solicitar cita
          </button>
        </div>
      </div>
    );

    var _render = (patients.selectedPatient && !patients.displayForm) ? _selectedPatientCard : this.renderForm(setDisabled);
    const doctor = appointment.responsable_servicio;
    return (
      <div className="ui one column container grid segment" style={{marginTop:50}}>
        <div className="ui one column">
          <div className="ui column">
            <div className="ui container">
                <div className="ui column">
                  <DoctorBadge className="doctorBadge" doctor={doctor} noMarginTop={true}></DoctorBadge>
                </div>
                <div className="ui grid profile-header-content">
                    <div className="ui one column grid">
                        <div className="ui column">
                            <DoctorName doctor={doctor}/>
                        </div>
                        <div className="ui column">
                            <DoctorPatientsType doctor={doctor}/>
                        </div>
                        <div className="ui column">
                            {doctor.idiomas && doctor.idiomas.length && 
                            <DoctorLanguages languages={doctor.idiomas}></DoctorLanguages>}
                        
                        </div>
                        <div className="ui column color-mcwDark">
                            <strong>{doctor.mensaje_publico}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui one column grid">
              <div className="ui small bg-mcwDark message fullWidth noRound">
                <div className="content">
                  <h2 className="header">
                    <i className="calendar icon"></i>Fecha y hora de la cita
                  </h2>
                </div>
              </div>
              <div className="ui column">
                Fecha: {keep.appointment.fecha_hora_inicio.format("dddd DD MMMM YYYY")}
              </div>
              <div className="ui column">
                Horario: {keep.appointment.fecha_hora_inicio.format("HH:mm")}
              </div>
              <div className="ui column">
                Duración: { keep.appointment.duracion_en_minutos} minutos
              </div>
            </div>
            
            <div className="ui one column grid">
              <div className="ui small bg-mcwDark message fullWidth noRound">
                <div className="content">
                  <h2 className="header">
                    <i className="user icon"></i>Introduzca sus datos
                  </h2>
                </div>
              </div>

              { _render }
              <PatientsModal patientsList={patients.patient}/>
            </div>
          </div>
          
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
