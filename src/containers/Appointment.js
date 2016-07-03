/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { GetAppointments, GetDoctorData }  from '../actions/Appointments';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import InstitutionDisplayer from '../components/InstitutionDisplayer';
import DoctorHeader from '../components/Doctor/DoctorHeader';
import DoctorGeneralInformation from '../components/Doctor/DoctorGeneralInformation';
import Loader from '../components/Loader';
import moment from 'moment';
import ErrorDisplayer from '../components/ErrorsDisplayer';
import { changeLanguage } from '../actions/UserActions';

class Appointment extends Component {
    constructor(props) {
      super(props);
    }

  componentDidMount(){
    const { store, router } = this.context;
    const { dispatch, appointment } = this.props;
    let initialDate = {
      minDate: moment().format("MM-DD-YYYY"),
      maxDate: moment().add('d',6).format("MM-DD-YYYY")
    };

    dispatch(GetDoctorData(this.props.params.doctorUsername));
    store.subscribe(() =>{
      let _state = store.getState();
    })

    }

  renderAppointmentScreen(appointment){
    const { user } = this.props;
    const { languageJson } = user;
    console.log(this.props.user.languageJson);
    if(appointment.responsable_servicio && !appointment.errorMessage) {
      const makeAnAppointment = (languageJson) ? languageJson.make_an_appointment : null;
      return (
        <div className="ui one column">
           <DoctorHeader doctor={ appointment.responsable_servicio } language={languageJson}>
           </DoctorHeader>
           <div className="ui container">
              <div className="ui small bg-mcwDark message fullWidth noRound">
                <div className="content">
                  <h2 className="header">
                  
                    <i className="calendar icon"></i>{makeAnAppointment}
                  </h2>
                </div>
              </div>
              <div className="ui column">
                {
                  this.renderLocations(appointment.responsable_servicio)
                }
              </div>
            </div>
        </div>
      )
    } else {
      return(<div className="ui one column grid" style={{marginTop:100}}>
        <ErrorDisplayer code={appointment.errorMessage.status}></ErrorDisplayer>
      </div>)
    }
    return null;
  }

  renderLocations(responsable_servicio){
    if(responsable_servicio.localidades && responsable_servicio.localidades.length){
      return responsable_servicio.localidades.map((localidad, i) =>{
        return (<div className="ui grid one column" key={i}>
          <div className="ui column" key={i}>
            <InstitutionDisplayer
              institution={localidad}
              doctor={responsable_servicio}
              doctorUsername={this.props.params.doctorUsername}
              languageJson={this.props.user.languageJson}
              key={i}/>
          </div>
        </div>)
      });
    }
  }


    render() {
      const { appointment, user } = this.props;
      const {loadingDoctorData, error} = appointment;
      const { languageJson } = user;
      let _render;
      if((loadingDoctorData) && !error){
        _render = (<Loader></Loader>)
      } else if(error){
        _render = (
          <div className="ui one column grid" style={{marginTop:100}}>
              <ErrorDisplayer code={error.status}></ErrorDisplayer>
          </div>
          )
      } else {
        _render = this.renderAppointmentScreen(appointment);
      }

      return _render;
    }
}

function mapStateToProps(state) {
  const { appointment, user } = state;
  return {
    appointment,
    user
  };
}

Appointment.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
