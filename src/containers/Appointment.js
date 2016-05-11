/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { GetAppointments }  from '../actions/Appointments';
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
    }
    dispatch(GetAppointments(this.props.params.doctorUsername, initialDate))

    store.subscribe(() =>{
      var _state = store.getState();
      if(_state.appointment.keep) {
        router.push({
          pathname: '/doctor/' + this.props.params.doctorUsername + '/appointment/checkout'
        })
      }
    })


  }

    renderAppointmentScreen(appointment){

      if(appointment.data) {
        return (
          <div className="ui one column grid">
            <div className="ui column">
              { DoctorProfileCard(appointment.data.responsable_servicio)}
            </div>
            <div className="ui column">
              {
                appointment.data.localidades.map((location, i) =>{
                  return <div className="ui grid one column" key={i}>
                    <div className="ui column" key={i}>
                      <InstitutionDisplayer institution={location} doctor={appointment.data.responsable_servicio}key={i}/>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        )
      }

      return null;


    }

    render() {
      const { appointment } = this.props;
      const {loading} = appointment;
      let _render = (loading) ? (<Loader/>) : this.renderAppointmentScreen(appointment);
      return _render;
    }
}

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

Appointment.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
