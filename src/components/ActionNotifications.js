/**
 * Created by epotignano on 20/03/16.
 */
import React, { Component, PropTypes } from 'react';
import Rebase from 're-base';
import Snackbar from 'material-ui/lib/snackbar';
import { FireRef } from '../constants/Commons';
const base = Rebase.createClass(FireRef)
class ActionNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    }
  }

  showMessage(actionNotification) {
    let Action = actionNotification[0];
    let OperationResult;

    if(Action._error) {
        OperationResult = 'error'
      } else {
        OperationResult = 'success'
      }
      this.setState({
        message: this.props.messages[Action._actionType][OperationResult],
        open: true
      })
  }

  componentDidMount() {
    base.listenTo(this.props.entityToObserveUrl, {
      context: this,
      asArray: true,
      queries: {
        limitToLast: 1
      },
      then(operationData) {
        this.showMessage(operationData);
      }
    })

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
}

export default ActionNotifications
