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
    let OperationResult;
    if(actionNotification.error) {
        OperationResult = 'error'
      } else {
        OperationResult = 'success'
      }
      this.setState({
        message: this.props.messages[actionNotification[0].type][OperationResult],
        open: true
      })
  }

  componentDidMount() {
    console.log('Some previous work');
    console.log(this.props);

    base.listenTo(this.props.entityToObserveUrl, {
      context: this,
      asArray: true,
      queries: {
        limitToLast: 1
      },
      then(newDoneJob) {
        console.log(newDoneJob);
        this.showMessage(newDoneJob);
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
