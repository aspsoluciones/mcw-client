import React from 'react';

const DoctorBadge = ({doctor}) => {
    
    let doctorPhoto = doctor.foto_url || "http://i.imgur.com/gdbSA.jpg";
    
    const styles = {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + doctorPhoto + ')'
    }
    
    return(
        <div className="doctorBadge">
            <div style={styles}>
            </div> 
        </div>   
    )   
}

export default DoctorBadge;