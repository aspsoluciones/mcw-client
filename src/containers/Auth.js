/**
 * Created by epotignano on 25/02/16.
 */
import React from 'react'
import { render } from 'react-dom'
import SessionTracker from '../components/SessionTracker';
class Auth extends React.Component {
  render(){
    return (
      <div className="auth ui middle aligned center aligned grid">
        <SessionTracker/>
        { this.props.children }
      </div>

    )
  }
}
module.exports = Auth;
