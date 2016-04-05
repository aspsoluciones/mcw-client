/**
 * Created by epotignano on 20/03/16.
 */
import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import { FireRef } from '../constants/Commons';

class ActionNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    }
  }

  showMessage(actionNotification) {
    const {_error, _actionType } = actionNotification[0];
      this.setState({
        message: this.props.messages[_actionType][(_error) ? 'error': 'success'],
        open: true
      })
  }

  componentDidMount() {
    

  }

  render() {
    return(
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={4000}
      />
    )
  }
}

ActionNotifications.propTypes = {
  entityToObserveUrl: PropTypes.string,
  messages: PropTypes.string
};

export default ActionNotifications
