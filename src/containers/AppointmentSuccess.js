import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import AppointmentSuccess from '../components/Appointments/AppointmentSuccess'

class AppointmentSuccessContainer extends Component {

    render() {
        const { appointment } = this.props;
        return (
            <div>
                <AppointmentSuccess></AppointmentSuccess>
            </div>
        );
    }
}

AppointmentSuccessContainer.propTypes = {

};

function mapStateToProps(state) {
    const { appointment } = state;
    return {
        appointment
    }
}
AppointmentSuccessContainer = connect(mapStateToProps)(AppointmentSuccessContainer)


export default AppointmentSuccessContainer;