/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { GetAppointments, GetDoctorData }  from '../actions/Appointments';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import InstitutionDisplayer from '../components/InstitutionDisplayer';
import Loader from '../components/Loader';
import moment from 'moment';

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
      if(_state.appointment.keep) {
        router.push({
          pathname: '/doctor/' + this.props.params.doctorUsername + '/appointment/checkout'
        });
      }
    })


  }

  renderAppointmentScreen(appointment){
    if(appointment.responsable_servicio) {
      return (
        <div className="ui one column grid">
          <div className="ui column">
            { DoctorProfileCard(appointment.responsable_servicio)}
          </div>
          <div className="ui column">
            {
              this.renderLocations(appointment.responsable_servicio)
            }
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
      const {loadingDoctorData} = appointment;

      let _render = (loadingDoctorData) ? (<Loader/>) : this.renderAppointmentScreen(appointment);
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
