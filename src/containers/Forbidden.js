/**
 * Created by epotignano on 25/02/16.
 */


import React, {Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Router } from 'react-router'
import { loginUser } from "../actions/AuthActions"

class Forbidden extends Component {

  redirectToHome() {

  }

  render(){
    return(
      <div className="ui one column center aligned grid">
        <h1>You can't access this page. Try to login</h1>
      </div>
    )
  }
}


Forbidden = connect()(Forbidden);

export default Forbidden;


