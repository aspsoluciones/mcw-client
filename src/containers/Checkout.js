/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DoctorProfileCard } from '../components/DoctorProfileCard';

class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log(this);

    this.state = {
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


  render() {
    console.log(this);

    return (
      <div className="ui one column grid">
        <div className="ui column">
          <div className="ui steps">
            <div className="step">
              <i className="truck icon"/>
              <div className="content">
                <div className="title">Shipping</div>
                <div className="description">Choose your shipping options</div>
              </div>
            </div>
            <div className="active step">
              <i className="payment icon"/>
              <div className="content">
                <div className="title">Billing</div>
                <div className="description">Enter billing information</div>
              </div>
            </div>
            <div className="disabled step">
              <i className="info icon"/>
              <div className="content">
                <div className="title">Confirm Order</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ui column">
          { DoctorProfileCard(this.state.doctor)}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

Checkout.contextTypes = {
  store: PropTypes.any
};

Checkout.stateTypes = {
  keep: PropTypes.any,
  doctor: PropTypes.any
};

export default connect(mapStateToProps)(Checkout);
