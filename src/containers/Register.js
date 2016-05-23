import React, { Component, PropTypes} from "react";
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Router } from 'react-router'
import { registerUser } from "../actions/AuthActions"
import Firebase from 'firebase';

class Register extends Component {
   render() {
    const { dispatch } = this.props;
    const { store, router} = this.context;

       return(
    <div className="ui one column center aligned grid">
        <form  onSubmit={e => {
        e.preventDefault();
        const email = this.refs.email.value.trim();
        const credentials = { email };
        dispatch(registerUser(credentials));
      }}
         className="column six wide form-holder">
          <h2 className="center aligned header form-head">Mi Clinica Web</h2>
          <div className="ui form">
            <div className="field">
              <input ref="email" type="email" placeholder="Email"/>
            </div>
            <div className="field">
              <input type="submit" value="登録" className="ui button large fluid green"/>
            </div>
          </div>
        </form>
      </div>
     )
   }
}

function mapStateProps(state) {
    const { auth } = state
    const { user, code } = auth;

    return {
        user, code
    }
}

Register.contextType = {
    store: PropTypes.any,
    router: PropTypes.any
}

Register = connect(mapStateProps)(Register);

export default Register;
