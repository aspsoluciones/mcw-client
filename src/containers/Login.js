/**
 * Created by epotignano on 25/02/16.
 */
import React, {Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Router } from 'react-router'
import { loginUser, FacebookLogin } from "../actions/AuthActions"
import Formsy from 'formsy-react';
import { FormsyText }  from 'formsy-material-ui';

class Login extends Component {

  componentDidMount() {
    $('.ui.modal').modal();
  }


  showModal() {
    $('.ui.modal')
      .modal({
        onApprove : () => {
          loginUser()
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



  }

  render(){
    const {dispatch, errorMessage, isAuthenticated, params} = this.props;
    const { userType } = params;
    const {store, router, route}  = this.context;

    console.log(params);

    var _materialForm = (

      <Formsy.Form ref="loginForm">
        <div className="row ui">
          <div className="one column ui section">
            <FormsyText
              name='username'
              validations='isWords'
              required
              value=""
            />
          </div>
        </div>

      </Formsy.Form>
    );


    var _form = (<form  onSubmit={e => {
            e.preventDefault();
            const username = this.refs.username.value.trim();
            const password = this.refs.password.value.trim();
            const credentials = {password, username, userType };
            dispatch(loginUser(credentials));
            store.subscribe(function()  {
              var _state = store.getState();
              if(_state.auth.isAuthenticated) {
                router.push('/app');
              }
            })
          }} className="ui large form">
      <div className="ui segment">



        <div className="field">
          <input ref="username" type="text" placeholder="Usuario"/>
        </div>
        <div className="field">
          <input ref="password" type="password" placeholder="Password"/>
        </div>
        <div className="field">
          <input type="submit" value="Ingresar" className="ui button large fluid blue"/>
        </div>
        <div className="inline field">
          <div className="ui left aligned checkbox">
            <input type="checkbox"/>
            <label>Recordarme</label>
          </div>
        </div>

      </div>

    </form>);


    return(
      <div className="login column">
          <h2 className="ui image">
            <img  src="../assets/Logo.png" alt="Mi clinica web Logo"/>
          </h2>
          <div className="ui column">
            { _form }
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
