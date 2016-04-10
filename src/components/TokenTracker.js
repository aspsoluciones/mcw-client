/**
 * Created by epotignano on 10/4/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

function toObservable(store) {
  return {
    subscribe({ onNext }) {
      let dispose = store.subscribe(() => onNext(store.getState()));
      onNext(store.getState());
      return { dispose };
    }
  }
}



class TokenTracker extends Component {

  constructor(props) {
    super(props);

  }
}


function mapStateProps(state) {
  const { auth, token } = state;
  return {
    auth, token
  }
}


TokenTracker = connect(mapStateProps)(TokenTracker);
export default TokenTracker;

