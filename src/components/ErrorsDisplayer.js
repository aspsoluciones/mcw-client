/**
 * Created by epotignano on 10/4/16.
 */

import React, { Component, PropTypes} from 'react';


function messageToRender(error){
  let msg;

  //handle special errros messages
  if(error && error.status == 404 && error.config.url.indexOf('perfilpublico') != -1 ) {
    msg = "Este perfil no ha sido encontrado.  Por favor verifique la dirección de URL ingresada o contacte a la persona buscada."

    return msg;
  }

  if(error && error.data && error.data.message){
    return error.data.message;
  } else if(!error || !error.status  ){
    msg = 'Ha ocurrido un error inesperado';
  } else {
    switch(error && error.status){
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
    window.scrollTo(0, 0);
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
