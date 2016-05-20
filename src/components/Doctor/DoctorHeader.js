import React from 'react';

import DoctorPatientsType from './DoctorPatientsType';
import DoctorName from './DoctorName';
import DoctorCarousel from './DoctorCarousel';

//TODO Should we add the option of define an own cover photo for a doctor;

const DoctorHeader = ({doctor}) => {
    
    var coverStyle = {
        background:"url(http://www.mybpd.ca/img/slides/dental-7g-01-slider-2.jpg) no-repeat right top",
        backgroundSize: "cover"
    };
    
    return (<div className="ui container doctorCover  content">
        <DoctorCarousel></DoctorCarousel>
        <div className="ui two columns grid">
            <div className="ui ten wide column one column center aligned middle aligned grid">
                <div className="ui column">
                    <DoctorName doctor={doctor}/>
                </div>
                <div className="ui column">
                    <DoctorPatientsType doctor={doctor}/>
                </div>
                <div className="ui column">
                    {doctor.mensaje_publico}
                </div>
            </div>
        </div>
    </div>);
}

export default DoctorHeader;