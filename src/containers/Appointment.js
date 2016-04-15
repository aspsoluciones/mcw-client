/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import InstitutionDisplayer from '../components/InstitutionDisplayer';

class Appointment extends Component {
    constructor(props) {
      super(props);

      this.state = {
        response: {
          doctor: {
            username: this.props.params.doctorUsername,
            lastName: 'Chespirito',
            firstName: 'Chapatin',
            categories: ['Odontología', 'Odontopediatría'],
            focuses: ['Bebes', 'Niños', 'Niñas', 'Adultos', 'Adultos mayores'], //Será un enum, con opciones predeterminadas del lado de la base de datos
            selfReview: 'Insunúa que soy viejo',
            institutions: [{
              id: '123',
              name: 'Hospital de Mexico',
              contactInfo: {
                telephone: '+506 2280.8441',
                email: 'mexico@hospital.com'
              },
              location: {}, //Coordenadas
              address: '9077 Ave. de la Amistad, Colonia Federal Tijuana, B. C., México',
              availability: [{date: new Date(), times: ['09:00', '09:30', '15:00']}]
            }]
          }
        }
      }
    }

  componentDidMount(){
    console.log(this);
    const { store, router } = this.context;
    store.subscribe(() =>{
      var _state = store.getState();
      if(_state.appointment.keep) {
        router.push('/doctor/' + this.props.params.doctorUsername + '/appointment/checkout')
      }
    })
  }

    render() {
      console.log(this.props.params);

      return(<div className="ui stackable grid">
        <div className="ui row">
          { DoctorProfileCard(this.state.response.doctor)}
        </div>
        {
          this.state.response.doctor.institutions.map((institution, i) =>{
            return <div className="ui row" key={i}>
              <div className="ui column">
                <InstitutionDisplayer institution={institution}/>
              </div>
            </div>
          })
        }
      </div>)
    }
}

function mapStateToProps(state) {
  return state;
}

Appointment.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
