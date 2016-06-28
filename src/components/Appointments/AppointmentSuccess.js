import React, {Component, PropTypes} from 'react';

class AppointmentSuccess extends Component {
    render() {
        return (
            <div className="ui massive icon green message">
                <i className="check circle icon"></i>
                <div className="content">
                    <div className="header">
                        Gracias por confiar en nosotros. Por favor chequee su correo electrónico para confirmar su solicitud.
                    </div>
                </div>
                
            </div>
        );
    }
}

AppointmentSuccess.propTypes = {

};

export default AppointmentSuccess;