/**
 * Created by epotignano on 10/4/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui';
import ErrorsDisplayer from '../components/ErrorsDisplayer';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import { loginUser } from '../actions/AuthActions';


class SessionTracker extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      canSubmit: false,
      messages : {
        'INVALID_PERMISSIONS' : 'Usuario, contraseña o dominio no válidos'
      }
    }
  }

  sendCredentials() {
    const { dispatch } = this.props;
    const { loginForm } = this.refs;
    var _credentials = loginForm.getCurrentValues();
    dispatch(loginUser(_credentials));
  }


  handleClose = () => {

    this.setState({openModal: false});
  };

  render() {
    const { auth } = this.props;

    const actions = [
      <RaisedButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.sendCredentials.bind(this)}
      />
    ];

    return(
      <Dialog
        title="Debe volver a introducir sus datos para continuar"
        actions={actions}
        modal={true}
        open={ !this.props.auth.isAuthenticated }
        onRequestClose={this.sendCredentials}
      >
        <Formsy.Form ref="loginForm" className="ui large form"
        >
          <div className="row ui">
            <div className="one column">
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
          </div>

        </Formsy.Form>

      </Dialog>

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

