/**
 * Created by epotignano on 15/4/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Checkout extends Component {

  render() {
    return (
      <div>
        <h1> Checkout screen</h1>
      </div>
    )

  }

}

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

Checkout.contextTypes = {
  store: PropTypes.any
};

export default connect(mapStateToProps)(Checkout);
