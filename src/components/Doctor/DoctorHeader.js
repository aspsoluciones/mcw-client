import React from 'react';

import DoctorPatientsType from './DoctorPatientsType';
import DoctorName from './DoctorName';
import DoctorCarousel from './DoctorCarousel';
import DoctorBadge from './DoctorBadge';
import DoctorLanguages from './DoctorLanguages';

//TODO Should we add the option of define an own cover photo for a doctor;

const DoctorHeader = ({doctor, language}) => {
    
    var coverStyle = {
        background:"url(http://www.mybpd.ca/img/slides/dental-7g-01-slider-2.jpg) no-repeat right top",
        backgroundSize: "cover"
    };
    
    return (
        <div className="ui column">
            <DoctorCarousel doctorPhotos={doctor.fotos} className="doctorCarousel"></DoctorCarousel>
            <div className="ui container">
                <DoctorBadge className="doctorBadge" doctor={doctor}></DoctorBadge>
                <div className="ui grid profile-header-content">
                    <div className="ui one column grid">
                        <div className="ui column">
                            <DoctorName doctor={doctor}/>
                        </div>
                        <div className="ui column">
                            <DoctorPatientsType doctor={doctor}/>
                        </div>
                        <div className="ui column">
                            {doctor.idiomas && doctor.idiomas.length && language && language.languages && 
                            <DoctorLanguages languages={doctor.idiomas} language={language}></DoctorLanguages>}
                        
                        </div>
                        <div className="ui column color-mcwDark">
                            <strong>{doctor.mensaje_publico}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default DoctorHeader;