/**
 * Created by epotignano on 25/02/16.
 */


import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Router } from 'react-router'
import { loginUser } from "../actions/AuthActions"
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


  render(){
    const {dispatch, errorMessage, isAuthenticated, params} = this.props;
    const { userType } = params;
    const {store, router, route}  = this.context;

    console.log(params);

    return(
      <div className="ui one column center aligned grid">
      <form  onSubmit={e => {
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
    }}

    className="column six wide form-holder">
      <h2 className="center aligned header form-head">Mi clinica web</h2>
    <div className="ui form">
      <div className="field">
      <input ref="username" type="text" placeholder="Email"/>
      </div>
      <div className="field">
      <input ref="password" type="password" placeholder="Password"/>
      </div>
      <div className="field">
      <input type="submit" value="Ingresar" className="ui button large fluid green"/>
      </div>
      <div className="inline field">
      <div className="ui checkbox">
      <input type="checkbox"/>
      <label>Remember me</label>
    </div>
    </div>
    {
      errorMessage == 'LOGIN_FAILED' && <span>Contraseña o usuario incorrectos</span>
  }
  </div>

    </form>
    <div className="ui column">
      <button className="ui button" onClick={this.showModal}> Forgot password? </button>
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
