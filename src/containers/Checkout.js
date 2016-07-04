/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import "react-day-picker/lib/style.css";
import validator from "validator";
import Formsy from 'formsy-react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
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
import ErrorsDisplayer from '../components/ErrorsDisplayer';
import { changeLanguage } from '../actions/UserActions';
import IntlTelInput from 'react-intl-tel-input';
import { recaptchaKey } from '../constants/Commons';
var ReCAPTCHA = require("react-google-recaptcha");

Formsy.addValidationRule('isRequiredIfNotValue', function (values, value, otherField) {
  if(value || values[otherField]) {
    return true;
  }
});

Formsy.addValidationRule('isDate', function(values, value, otherField){
  if(value){
    return validator.isDate(value);
  }
})

function selectValue(state){
  return state.patients.resetForm;
}

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showCurrentDate = this.showCurrentDate.bind(this);
    this.phoneVerify = this.phoneVerify.bind(this);
    this.phoneLineVerify = this.phoneLineVerify.bind(this);
    this.recaptchaValidate = this.recaptchaValidate.bind(this);

    this.state = {
      openPatientModal : false,
      canSubmit: false,
      selectedDay: moment(),
      value: moment().format('L'), // The value of the input field
      month: new Date(), // The month to display in the calendar
      validatePhone: false,
      validateLinePhone: false,
      recaptcha: false
    }
  }


  componentDidMount(){
    const { store } = this.context;
    const { dispatch } = this.props;
    const { appointmentForm } = this.refs;
    let currentValue;
    store.subscribe(()=>{
      let previousValue = currentValue;
      currentValue = selectValue(store.getState());
      if(!previousValue && currentValue && appointmentForm){
        appointmentForm.reset();
      }
    })

    if(!this.props.appointment.keep) this.goBack();
  }

  goBack(){
    const { router } = this.context;
    
    router.push({
      pathname: '/doctor/' + this.props.params.doctorUsername
    });
  }

  phoneVerify(status, value, countryData, number, id) {
    this.setState({
      validatePhone: status
    })

    this.state.phone = value;
  }

  phoneLineVerify(status, value, countryData, number, id) {
    this.setState({
      validateLinePhone: status
    })

    this.state.linePhone = value;
  }

  recaptchaValidate(response) {
    this.setState({
      recaptcha: true
    })
  }

  openModal() {
    const { dispatch } = this.props;
    dispatch(patientSelectModal())
  }

  submitAppointment(data) {
    const { dispatch, appointment } = this.props;
    const { keep } = appointment;
    data.numero_tel_celular = this.state.phone;
    data.numero_tel_particular = this.state.linePhone;
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

  renderLoadingForEmail(){
    const {patients} = this.props;
    if(patients.isLoading){
      return (<i className="spinner loading icon"></i>)
    } else {
      return null;
    }
  }


  showCurrentDate() {
    this.refs.daypicker.showMonth(this.state.month);
  }

  handleInputChange(e) {
    const { value } = e.target;

    // Change the current month only if the value entered by the user
    // is a valid date, according to the `L` format
    if (moment(value, 'L', true).isValid()) {
      this.setState({
        month: moment(value, 'L').toDate(),
        value
      }, this.showCurrentDate);
    } else {
      this.setState({ value }, this.showCurrentDate);
    }
  }

  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('L'),
      month: day
    });
  }

  renderForm(setDisabled){
      const RequestAppointment = (this.props.user.languageJson) ? this.props.user.languageJson.appointment_request : null
      const selectedDay = moment(this.state.value, 'L', true).toDate();
      var { user } = this.props;
      var languageJson = (user.languageJson) ? user.languageJson : {};
      const MaleLabel = (this.props.user.languageJson) ? this.props.user.languageJson.male : null
      const FemaleLabel = (this.props.user.languageJson) ? this.props.user.languageJson.female : null
      
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
              {this.renderLoadingForEmail(this.state.patients && this.state.patients.isLoading)}
            </div>
            <div className="ui column">
              <FormsyText
                name='nombre'
                hintText={languageJson.first_name}
                required
                value=""
              />
            </div>

            <div className="ui column">
              <FormsyText
                name='apellido'
                hintText={languageJson.last_name}
                required
                value=""
              />
            </div>
            <div className="ui column">
           <FormsyDate
              name="fecha_nacimiento"
              floatingLabelText={languageJson.birth_date}
            />
            </div>
            <div className="ui column">
              <FormsySelect
                name="sexo"
                required
                floatingLabelText={languageJson.gender}
                menuItems={this.selectFieldItems}
              >
                <MenuItem value={'M'} primaryText={MaleLabel} />
                <MenuItem value={'F'} primaryText={FemaleLabel} />
              </FormsySelect>
            </div>
            <div className="ui column">
              <div className="field">
                <label>{languageJson.personal_phone}</label>
                <IntlTelInput defaultCountry={'pa'}
                              preferredCountries={['pa', 'ar']}
                              numberType={'FIXED_LINE'}
                              onPhoneNumberChange={this.phoneLineVerify}
                              css={['intl-tel-input', 'form-control']}
                              utilsScript={'libphonenumber.js'} />
              </div>
            </div>
            <div className="ui column">
              <div className="field">
                <label>{languageJson.cell_phone}</label>
                <IntlTelInput
                            defaultCountry={'pa'}
                            preferredCountries={['pa', 'ar']}
                            onPhoneNumberChange={this.phoneVerify}
                            css={['intl-tel-input', 'form-control']}
                            utilsScript={'libphonenumber.js'} />
              </div>
            </div>
            <div className="ui column">
              <FormsyText
                name='note'
                hintText={languageJson.notes}
                value=""
              />
            </div>

          </div>

          <div className="recaptcha">
            <ReCAPTCHA
              ref="recaptcha"
              sitekey={recaptchaKey}
              onChange={this.recaptchaValidate}
            />
          </div>

          <div className="ui column">
            <button type="submit" disabled={setDisabled} className="ui button fluid blue">
             {RequestAppointment}
            </button>
          </div>

        </div>
      </Formsy.Form>
      
      
      </div>

      );

    return _form;
  }

  render() {

    const { appointment, patients, user } = this.props;
    var languageJson = (user.languageJson) ? user.languageJson : {};
    const locale = (this.props.user.languageJson && this.props.user.languageJson.selectedLang == 'en-us') ? 'en': 'es';
    const AppointmentDateAndTime = (this.props.user.languageJson) ? this.props.user.languageJson.appointment_date_time : null;
    const EnterYourData = (this.props.user.languageJson) ? this.props.user.languageJson.enter_your_data : null
    const RequestAppointment = (this.props.user.languageJson) ? this.props.user.languageJson.appointment_request : null
    const keep = (appointment && appointment.keep) ? appointment.keep : {};
    const fecha = (keep && keep.appointment && keep.appointment.fecha_hora_inicio) ? keep.appointment.fecha_hora_inicio.locale(locale).format("dddd DD MMMM YYYY") : null; 
    const horario = (keep && keep.appointment && keep.appointment.fecha_hora_inicio) ? keep.appointment.fecha_hora_inicio.format("HH:mm") : null;
    const duracion_minutos = (keep && keep.appointment && keep.appointment.duracion_en_minutos) ? keep.appointment.duracion_en_minutos : null;
    
    let _modal = (this.state.openPatientModal) ? <PatientsModal patientsList={patients.patient}/> : null;
    const setDisabled = (!patients.selectedPatient || patients.displayForm) && (!this.state.canSubmit || appointment.requestingAppointment || (!this.state.validatePhone && !this.state.validateLinePhone) || !this.state.recaptcha);
    console.log(setDisabled);
    let _changePatientButton = (patients.patient && patients.patient.length > 1) ? (<button className="ui button fluid blue" onClick={this.reOpenPatientsModal.bind(this)}>
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
            {RequestAppointment}
          </button>
        </div>
      </div>
    );

    if(appointment.error || patients.error){
      const error = appointment.error || patients.error;
      return (<div className="ui one column grid" style={{marginTop:100}}>
              <ErrorsDisplayer code={error.status}/>
          </div>)
    }

    var _render = (patients.selectedPatient && !patients.displayForm) ? _selectedPatientCard : this.renderForm(setDisabled);
    const doctor = appointment.responsable_servicio;
    return (
      <div ref="_div" className="ui one column container grid segment" style={{marginTop:50}}>
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
                          {
                              this.props.user.languageJson && this.props.user.languageJson.focuses 
                                && <DoctorPatientsType doctor={doctor} language={this.props.user.languageJson}/>
                          }                        
                        </div>
                        <div className="ui column">
                          {doctor.idiomas && doctor.idiomas.length && this.props.user.languageJson && this.props.user.languageJson.languages && 
                            <DoctorLanguages languages={doctor.idiomas} language={this.props.user.languageJson}></DoctorLanguages>}
                        
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
                    <i className="calendar icon"></i>{AppointmentDateAndTime}
                  </h2>
                </div>
              </div>
              <div className="ui column">
                {languageJson.date}: {fecha}
              </div>
              <div className="ui column">
                {languageJson.time}: {horario}
              </div>
              <div className="ui column">
                {languageJson.duration}: { duracion_minutos } {languageJson.minutes}
              </div>
            </div>
            
            <div className="ui one column grid">
              <div className="ui small bg-mcwDark message fullWidth noRound">
                <div className="content">
                  <h2 className="header">
                    <i className="user icon"></i>{EnterYourData}
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
  const { appointment, patients, user } = state;
  return {
    appointment,
    patients,
    user
  }
}

Checkout.propTypes = {
  dispatch : PropTypes.any
}

Checkout.contextTypes = {
  store: PropTypes.any,
  router : PropTypes.any
};

Checkout.stateTypes = {
  keep: PropTypes.any,
  doctor: PropTypes.any
};

export default connect(mapStateToProps)(Checkout);
