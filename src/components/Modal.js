/**
 * Created by epotignano on 9/4/16.
 */

import React, { Component, PropTypes } from 'react';

class RecoverPasswordModal extends Component {
  render(){
    return(
    <div className="ui small modal">
      <div className="header">
        Olvidó su contraseña
      </div>
      <div className="content">
        <div className="description">
          <Formsy.Form ref="mailRecovery"
          >
            <div className="row ui">
              <div className="one column ui section">
                <FormsyText
                  name='recoverEmail'
                  validations='isWords'
                  hintText="Ingrese su e-mail"
                  required
                  value=""
                />
              </div>
            </div>
          </Formsy.Form>
        </div>
      </div>
      <div className="actions">
        <div className="ui column centered grid">
          <div className="ui row">
            <div className="middle aligned content">
              <div className="item">
                <a className="header">Enviar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

