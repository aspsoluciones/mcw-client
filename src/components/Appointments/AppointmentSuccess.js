import React, {Component, PropTypes} from 'react';

class AppointmentSuccess extends Component {
    render() {
        const {message} = this.props;
        return (
            <div className="ui massive icon green message">
                <i className="check circle icon"></i>
                <div className="content">
                    <div className="header">
                        { message }
                    </div>
                </div>
                
            </div>
        );
    }
}

AppointmentSuccess.propTypes = {
    message : PropTypes.string
};

export default AppointmentSuccess;