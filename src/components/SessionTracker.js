/**
 * Created by epotignano on 10/4/16.
 */

import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class SessionTracker extends Component {

  constructor(props) {
    super(props);

    axios.interceptors.response.use((config) => {
      // Do something before request is sent
      console.log(config);
      return config;
    }, (error) => {
      // Do something with request error
      return Promise.reject(error);
    });
  }

  componentDidMount() {
    $('.ui.modal').modal();

    /*setTimeout(() => {
      console.log('Hello');
      this.showLoginModal();
    },3000)*/
  }

  componentDidUpdate() {

  }


  showLoginModal(){
    $('.ui.modal')
      .modal({
        blurred: true
      })
      .modal({
        blurring:true
      })
      .modal('setting', 'closable', false)
      .modal('setting', 'transition', 'horizontal flip')
      .modal('show')
  }

  render() {

    return(
      <div className="ui modal">
        <div className="header">Introduce tu contraseña de nuevo por favor</div>
        <div className="content">
          Introduce tu contraseña de nuevo por favor
        </div>
      </div>

    )
  }
}


function mapStateProps(state) {
  const { auth, token } = state;
  return {
    auth, token
  }
}


SessionTracker = connect(mapStateProps)(SessionTracker);
export default SessionTracker;

