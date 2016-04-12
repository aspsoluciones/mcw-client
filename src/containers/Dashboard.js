/**
 * Created by epotignano on 25/02/16.
 */
import React, {PropTypes} from 'react';

class Dashboard extends React.Component {
  render(){
    return(
      <div className="row">
        <div className="column">
          <h1>Dashboard title</h1>
          <h2>This will be our dashboard</h2>
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;
