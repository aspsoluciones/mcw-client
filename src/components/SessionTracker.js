/**
 * Created by epotignano on 10/4/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui';
import ErrorsDisplayer from '../components/ErrorsDisplayer';

class SessionTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    }
  }

  componentDidMount() {
    $('.ui.modal').modal();

    const { auth } = this.props;

    //Todo, remove this, find a different way to do it
    setTimeout(() => {
      if(!auth.isAuthenticated) {
        this.showLoginModal();
      }
    } , 500)
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

  sendCredentials(credentials) {
    const { dispatch } = this.props;
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

  render() {
    const { auth } = this.props;
    return(
      <div className="ui modal">
        <div className="header">Introduce tu contraseña de nuevo por favor</div>

          <Formsy.Form ref="loginForm" className="content"
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
                  auth.errorMessage && <ErrorsDisplayer message={ this.state.messages[auth.errorMessage] }/>
                }


              </div>
              <div className="column">
                <button type="submit" className="ui button fluid blue">
                  Ingresar
                </button>
              </div>
            </div>

          </Formsy.Form>
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

SessionTracker.contextTypes = {
  router: PropTypes.any
};

SessionTracker = connect(mapStateProps)(SessionTracker);
export default SessionTracker;

