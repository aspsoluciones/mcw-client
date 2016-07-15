/**
 * Created by epotignano on 10/4/16.
 */

import React, { Component, PropTypes} from 'react';


function messageToRender(error){
  let msg;

  if(error.data && error.data.message){
    return error.data.message;
  } else if(!error.status || !error ){
    msg = 'Ha ocurrido un error inesperado';
  } else {
    switch(error.status){
        case(500):
            msg = 'Ha ocurrido un error, intente más tarde';
            break;
        case(404):
            msg = 'Url no encontrada, revise los datos ingresados';
            break;
        case(400):
          msg = 'Ha ocurrido un error en nuestro sistema, intente nuevamente más tarde';
          break;
        default:
        msg = 'Ha ocurrido un error inesperado';
    }
  }

  return msg;
}

class ErrorsDisplayer extends Component {
  render() {
    const { error } = this.props;
    return(
      <div className="ui column centered grid">
        <div className="ui row">
          <div className="middle aligned content">
            <h5 className="ui header red">
              {  messageToRender(error) }
            </h5>
          </div>
        </div>
      </div>
    )
  }

}

ErrorsDisplayer.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string
};

export default ErrorsDisplayer;
