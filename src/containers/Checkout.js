/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui';
import { ConfirmAppointment } from '../actions/Appointments';

class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log(this);

    this.state = {
      doctor: {
        username: 'chapatin',
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

  sendCredentials(appointment) {
    const { dispatch } = this.props;
    dispatch(ConfirmAppointment(appointment));
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


  render() {
    const { appointment } = this.props;
    const { keep } = appointment;

    return (
      <div className="ui one column grid">
        <div className="ui column">
          <div className="ui steps">
            <div className="active step">
              <i className="truck icon"/>
              <div className="content">
                <div className="title">Shipping</div>
                <div className="description">Choose your shipping options</div>
              </div>
            </div>
            <div className="step">
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

        <div className="ui one column grid segment">
          <div className="ui column">
            { keep.day.date.format("DD MMMM YYYY")}
          </div>
          <div className="ui column">
            { keep.time }
          </div>
        </div>

        <div className="ui one column grid segment">
          <Formsy.Form ref="appointmentForm" className="ui large form"
                       onValid={this.enableButton.bind(this)}
                       onInvalid={this.disableButton.bind(this)}
                       onValidSubmit={this.sendCredentials.bind(this)}
          >
            <div className="row ui">
              <div className="one column ui segment">
                <div className="ui column">
                  <FormsyText
                    name='email'
                    hintText="Email"
                    required
                    value=""
                  />
                </div>
                <div className="ui column">
                  <FormsyText
                    name='name'
                    hintText="Nombre"
                    required
                    value=""
                  />
                </div>

                <div className="ui column">
                  <FormsyText
                    name='lastName'
                    hintText="Apellido"
                    required
                    value=""
                  />
                </div>
                <div className="ui column">
                  <FormsyText
                    name='phone'
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
