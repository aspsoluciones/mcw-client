/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { FormsyText, FormsySelect } from 'formsy-material-ui';
import FormsyAutocomplete from '../utils/formsy/autocomplete';
import { ConfirmAppointment } from '../actions/Appointments';
import { getPatientByEmail, selectPatient } from '../actions/PatientsActions';
import PatientsModal from '../components/PatientsModal';
import PatientCard from '../components/PatientCard';

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { store } = this.context;
    const { appointmentForm } = this.refs;

    store.subscribe(() => {
      const { patients } = store.getState();
      if(patients.patient && patients.patient.length) {
        if(patients.patient.length == 1) {
          selectPatient(patients.patient);
        }
      }
    });
  }

  submitAppointment(data) {
    let _data = data;
    const { dispatch, appointment } = this.props;
    const { keep } = appointment;
    data.info = keep.appointment;
    dispatch(ConfirmAppointment({"appointment": _data }));
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

  renderModal(clientsList){
    return <PatientsModal patientsList={clientsList}  />
  }

  render() {

    const { appointment, patients } = this.props;
    const { keep } = appointment;

    let _modal = (patients.patient && patients.patient.length &&  patients.patient.length != 1 ) ? <PatientsModal patientsList={patients.patient}/> : null;
    let _form = (<div className="ui one column grid segment">
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
            <div className="ui column">
              <FormsySelect
                name="genre"
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
                hintText="Número de teléfono"
                required
                value=""
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
              Enviar
            </button>
          </div>
        </div>
      </Formsy.Form>
    </div>);

    let _selectedPatientCard = (
      <PatientCard patient={patients.selectedPatient}/>
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

        { _render }
        { _modal }
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
