/**
 * Created by epotignano on 25/02/16.
 */
import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'

class Auth extends React.Component {
  render(){
    return (
      <div className="ui page grid">
        { this.props.children }
      </div>

    )
  }
}
module.exports = Auth;
