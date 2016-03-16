/**
 * Created by epotignano on 25/02/16.
 */
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  render(){
    return(
      <div className="row">
        <div className="column">
            <h1>Welcome to amasing</h1>
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;
