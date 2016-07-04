import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import AppointmentSuccess from '../components/Appointments/AppointmentSuccess'

class AppointmentSuccessContainer extends Component {

    render() {
        const { appointment, user } = this.props;
        const { languageJson } = user;

        return (
            <div>
                <AppointmentSuccess message={languageJson.appointment_success}></AppointmentSuccess>
            </div>
        );
    }
}

AppointmentSuccessContainer.propTypes = {

};

function mapStateToProps(state) {
    const { appointment, user } = state;
    return {
        appointment,
        user
    }
}
AppointmentSuccessContainer = connect(mapStateToProps)(AppointmentSuccessContainer)


export default AppointmentSuccessContainer;