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

class Appointment extends Component {
    constructor(props) {
      super(props);
    }

  componentDidMount(){
    const { store, router } = this.context;
    const { dispatch } = this.props;

    let initialDate = {
      minDate: moment().format("MM-DD-YYYY"),
      maxDate: moment().add('d',6).format("MM-DD-YYYY")
    };

    dispatch(GetDoctorData(this.props.params.doctorUsername));
    dispatch(GetAppointments(this.props.params.doctorUsername, initialDate));

    store.subscribe(() =>{
      let _state = store.getState();
      /*if(_state.appointment.keep) {
        router.push({
          pathname: '/doctor/' + this.props.params.doctorUsername + '/appointment/checkout'
        });
      }*/
    })


  }

  renderAppointmentScreen(appointment){
    if(appointment.responsable_servicio) {
      return (
        <div className="ui one column">
           <DoctorHeader doctor={ appointment.responsable_servicio }>
           </DoctorHeader>
           <div className="ui container">
              <h3 className="color-mcwDark" style={{marginBottom: 0}}>
                <i className="calendar icon"></i>Hacer una cita
              </h3>
              <div className="ui column">
                {
                  this.renderLocations(appointment.responsable_servicio)
                }
              </div>
            </div>
        </div>
      )
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
              key={i}/>
          </div>
        </div>)
      });
    }
  }


    render() {
      const { appointment } = this.props;
      const {loadingDoctorData, error} = appointment;
      let _render;
      if(loadingDoctorData && !error){
        _render = (<Loader></Loader>)
      } else if(error){
        console.log('Entrado');
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
  const { appointment } = state;
  return {
    appointment
  };
}

Appointment.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
