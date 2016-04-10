/**
 * Created by epotignano on 10/4/16.
 */

import React, { Component, PropTypes} from 'react';
class ErrorsDisplayer extends Component {
  render() {
    return(
      <div className="ui column centered grid">
        <div className="ui row">
          <div className="middle aligned content">
            <h5 className="ui header red">
              { this.props.message }
            </h5>
            <i className="warning circle icon"/>
          </div>
        </div>
      </div>
    )
  }

}

ErrorsDisplayer.propTypes = {
  message: PropTypes.string
};

export default ErrorsDisplayer;
