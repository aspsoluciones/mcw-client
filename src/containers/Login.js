/**
 * Created by epotignano on 25/02/16.
 */
import React, {Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { loginUser } from "../actions/AuthActions"
import Formsy from 'formsy-react';
import { FormsyText }  from 'formsy-material-ui';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    }
  }

  componentDidMount() {
    $('.ui.modal').modal();
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
    const {dispatch, errorMessage, isAuthenticated, params} = this.props;
    const { userType } = params;
    const {store, router, route}  = this.context;

    console.log(params);

    var _materialForm = (

      <Formsy.Form ref="loginForm" className="ui large form"
           onValid={this.enableButton}
           onInvalid={this.disableButton}
           onValidSubmit={this.sendCredentials.bind(this)}
      >
        <div className="row ui">
          <div className="one column ui segment">
            <div className="column">
              <FormsyText
                name='username'
                validations='isWords'
                hintText="Usuario"
                required
                value=""
              />
            </div>
            <div className="column">
              <FormsyText
                name='password'
                hintText="Contraseña"
                required
                value=""
              />
            </div>
            <div className="column">
              <FormsyText
                name='domain'
                hintText="Cuenta"
                validations='isWords'
                required
                value=""
              />
            </div>

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
          <div className="ui small modal">
            <div className="header">
              Recover password
            </div>
            <div className="content">
              <div className="description">
                <p>Introduce your email for recover your password</p>
              </div>
              <div className="description">
                <Formsy.Form ref="mailRecovery"
                >
                  <div className="row ui">
                    <div className="one column ui section">
                      <FormsyText
                        name='recoverEmail'
                        validations='isWords'
                        required
                        value=""
                      />
                    </div>
                  </div>
                </Formsy.Form>
              </div>
            </div>
            <div className="actions">
              <div className="two fluid ui  buttons">
                <button className="ui red deny button">
                  Cancel
                </button>
                <button className="ui green positive button">
                  Send
                </button>
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
  const {isAuthenticated, errorMessage} = auth;

  return {
    isAuthenticated, errorMessage
  }
}

Login = connect(mapStateProps)(Login);

export default Login;
