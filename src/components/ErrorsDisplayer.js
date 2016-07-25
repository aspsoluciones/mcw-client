/**
 * Created by epotignano on 10/4/16.
 */

import React, { Component, PropTypes} from 'react';


function messageToRender(error, languageJson){

  let msg;

  if(!error || !error.status  ){
    msg = 'Ha ocurrido un error inesperado';
  };

  if(error && error.data && error.data.message){
    return error.data.message;
  }

  if(languageJson){
    //handle special errros messages
    if(error && error.status == 404 && error.config.url.indexOf('perfilpublico') != -1 ) {
      msg = languageJson.doctor_404;
      return msg;
    }
    else {
      switch(error && error.status){
        case(500):
          msg = languageJson.error_500;
          break;
        case(404):
          msg = languageJson.error_404;
          break;
        case(400):
          msg = languageJson.error_400;
          break;
        default:
          msg = languageJson.error_unknow;
      }
    }
  }



  return msg;
}

class ErrorsDisplayer extends Component {
  render() {
    window.scrollTo(0, 0);
    const { error, languageJson} = this.props;
    return(
      <div className="ui column centered grid">
        <div className="ui row">
          <div className="middle aligned content">
            <h5 className="ui header red">
              {  messageToRender(error, languageJson) }
            </h5>
          </div>
        </div>
      </div>
    )
  }

}

ErrorsDisplayer.propTypes = {
  message: PropTypes.string,
  languageJson: PropTypes.any
};

export default ErrorsDisplayer;
