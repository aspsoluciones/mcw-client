/**
 * Created by epotignano on 25/02/16.
 */
import React, {Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { loginUser } from "../actions/AuthActions"
import Formsy from 'formsy-react';
import { FormsyText, FormsyCheckbox } from 'formsy-material-ui';
import ErrorsDisplayer from '../components/ErrorsDisplayer';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      messages : {
      'INVALID_PERMISSIONS' : 'Usuario, contraseña o dominio no válidos'
      }
    };
  }

  componentDidMount() {
    //$('.ui.modal').modal();
  }
  showModal() {
    $('.ui.modal')
      .modal({
        onApprove : () => {
          //this.sendRecoveryMail();
        }
      })
      .modal({
        blurring:true
      })
      .modal('setting', 'transition', 'fade up')
      .modal('show')
  }

  sendRecoveryMail() {
    console.log(this.refs.recoverEmail)
  }

  sendCredentials(credentials) {
    const { dispatch } = this.props;
    dispatch(loginUser(credentials));
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

  render(){
    const { auth } = this.props;
    const {dispatch } = this.props;
    const {store, router, route}  = this.context;
    var _materialForm = (
      <Formsy.Form ref="loginForm" className="ui large form"
           onValid={this.enableButton.bind(this)}
           onInvalid={this.disableButton.bind(this)}
           onValidSubmit={this.sendCredentials.bind(this)}
      >
        <div className="row ui">
          <div className="one column ui segment">
            <div className="ui column">
              <FormsyText
                name='username'
                hintText="Usuario"
                required
                value=""
              />
            </div>
            <div className="ui column">
              <FormsyText
                name='password'
                hintText="Contraseña"
                required
                type="password"
                value=""
              />
            </div>
            <div className="ui column">
              <FormsyText
                name='domain'
                hintText="Cuenta"
                required
                value=""
              />
            </div>
            {
              auth.payload && <ErrorsDisplayer message={ this.state.messages[auth.payload.message] }/>
            }


          </div>
          <div className="column">
            <button type="submit" className="ui button fluid blue">
              Ingresar
            </button>
          </div>
        </div>

      </Formsy.Form>
    );

    return(
      <div className="login ui one column grid">
          <h3 className="ui image medium">
            <img  src="../assets/Logo.png" alt="Mi clinica web Logo"/>
          </h3>
          <div className="ui column">
            { _materialForm }
          </div>
          <div className="ui column">
              <div className="ui items">
                <div className="item">
                  <div className="center aligned middle aligned content">
                    <h5>
                      <a onClick={this.showModal} className="authLink">¿Olvidó su contraseña?</a>
                    </h5>
                  </div>
                </div>
              </div>
          </div>

        </div>

    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.any,
  store: React.PropTypes.any,
  route: React.PropTypes.any
};

function mapStateProps(state) {
  const { auth } = state;
  return {
   auth
  }
}

Login = connect(mapStateProps)(Login);

export default Login;
