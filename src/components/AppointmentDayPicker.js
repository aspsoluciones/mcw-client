import React, {Component, PropTypes} from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import "react-day-picker/lib/style.css";
import "../styles/dayPicker.scss";
import DayPicker,{DateUtils} from 'react-day-picker';
import 'moment/locale/es';
//Pasar esto a un state si se requiere poder cambiar de idioma.
const locale = 'es';

class AppointmentDayPicker extends Component {

    constructor(props){
        super(props);
    }

    clickProxy(day){
        this.props.onClick(day);
    }

    render() {
        const { onCalendarClick, selectedDate, month, locale } = this.props;
        let lang
        if(locale == 'en-US'){
            lang = 'en';
        } else {
            lang = 'es';
        }
        const Month = parseInt(selectedDate.format('M'));
        let proxy = this.clickProxy.bind(this);
        return (
            <DayPicker
                locale={lang}
                localeUtils={MomentLocaleUtils}
                className="Availability"
                selectedDays={day => DateUtils.isSameDay(selectedDate.toDate(), day)}
                disabledDays={DateUtils.isPastDay}
                initialMonth={month}
                onDayClick={ (e, day, { disabled, selected }) => {
                  if(!disabled){
                    proxy(day)
                  }
                }
              }
            />
        );
    }
}

AppointmentDayPicker.propTypes = {
    month: PropTypes.any,
    onCalendarClick: PropTypes.func,
    selectedDate: PropTypes.any,
    locale: PropTypes.string
};

export default AppointmentDayPicker;
