/**
 * Created by epotignano on 25/02/16.
 */


import React, {Component, PropTypes } from 'react'
import { render } from 'react-dom';
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
         className="column six wide form-holder">
        <h2 className="center aligned header form-head">Mi Clinica Web Login</h2>
        <div className="ui form">
            <Formsy.Form ref="mailRecovery" className="ui form"
                >
                <div className="row ui">
                    <div className="one column ui section">
                    <FormsyText
                        name='email'
                        validations='isWords'
                        required
                        value=""
                    />
                    </div>
                    <div className="one column ui section">
                    <FormsyText
                        name='password'
                        validations='isWords'
                        required
                        value=""
                    />
                    </div>
                </div>
            </Formsy.Form>
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


