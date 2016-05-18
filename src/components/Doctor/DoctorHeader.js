import React from 'react';

import DoctorPatientsType from './DoctorPatientsType';
import DoctorName from './DoctorName';
const style = {
    
}

//TODO Should we add the option of define an own cover photo for a doctor;




const DoctorHeader = ({doctor}) => {
    
    var coverStyle = {
        background:"url(http://www.mybpd.ca/img/slides/dental-7g-01-slider-2.jpg) no-repeat right top",
        backgroundSize: "cover"
    };
    
    return (<div className="ui container doctorCover center aligned middle aligned content">
        <div className="ui two columns grid doctorContent" style={coverStyle}>
            <div className="ui six wide column">
                <image className="ui image circular medium" src="http://previews.123rf.com/images/samuraitop/samuraitop1402/samuraitop140200024/25956537-Doctor-illustration-Stock-Vector.jpg"/>
            </div>
            <div className="ui ten wide column">
                <div className="ui column">
                    <DoctorName doctor={doctor}/>
                </div>
                <div className="ui column">
                    <DoctorPatientsType doctor={doctor}/>
                </div>
            </div>
        </div>
    </div>);
}

export default DoctorHeader;