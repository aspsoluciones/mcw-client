/**
 * Created by epotignano on 10/4/16.
 */

import React, { Component, PropTypes} from 'react';


function messageToRender(code){
  let message;
  
  if(code == 500){
    message = 'Ha ocurrido un error, intente más tarde'
  }

  if(!code){
    message = 'Ha ocurrido un error inesperado';
  }
  
  return message;
} 

class ErrorsDisplayer extends Component {
  render() {
    const { code } = this.props;
    return(
      <div className="ui column centered grid">
        <div className="ui row">
          <div className="middle aligned content">
            <h5 className="ui header red">
              {  messageToRender(code) }
            </h5>
          </div>
        </div>
      </div>
    )
  }

}

ErrorsDisplayer.propTypes = {
  code: PropTypes.number
};

export default ErrorsDisplayer;
