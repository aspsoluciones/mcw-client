/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DoctorProfileCard } from '../components/DoctorProfileCard';

class Appointment extends Component {
    constructor(props){
      super(props);

      this.state = {
        response: {
          doctor: {
            username: this.props.params.doctorUsername,
            lastName: 'Chespirito',
            firstName: 'Chapatin',
            categories: ['Odontología', 'Odontopediatría'],
            focuses: ['Bebes', 'Niños', 'Niñas', 'Adultos', 'Adultos mayores'], //Será un enum, con opciones predeterminadas del lado de la base de datos
            selfReview: 'Insunúa que soy viejo'
          }
        }
      }
    }

    render() {
      console.log(this.props.params);

      return(<div>
        { DoctorProfileCard(this.state.response.doctor)}
      </div>)
    }
}

function mapStateToProps(state) {
  return state;
}


Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
