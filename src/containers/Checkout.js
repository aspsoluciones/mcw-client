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
  }

  submitAppointment(data) {
    var _data = data;
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


  render() {
    const { appointment } = this.props;
    const { keep } = appointment;

    return (
      <div className="ui one column grid">
        <div className="ui column">

        </div>

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
          <div className="ui column">

          </div>
        </div>

        <div className="ui one column grid segment">
          <Formsy.Form ref="appointmentForm" className="ui large form"
                       onValid={this.enableButton.bind(this)}
                       onInvalid={this.disableButton.bind(this)}
                       onValidSubmit={this.submitAppointment.bind(this)}
          >
            <div className="row ui">
              <div className="ui one column grid">
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
                    name='nombre_persona'
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
