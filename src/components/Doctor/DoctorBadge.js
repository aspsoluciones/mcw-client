import React from 'react';

const DoctorBadge = ({doctor, noMarginTop}) => {
    
    let doctorPhoto = doctor.ubicacion_foto || "//fi.realself.com/300x300/69509a87b24c62c3ebf5a38d9018e1a4/1/c/a/50019-2283600.jpg";
    
    const styles = {
        backgroundSize: 'cover',
        backgroundImage: 'url(' + doctorPhoto + ')'
    }

    const classToUse = (noMarginTop) ? 'profile-header-image badgeWithMargin' : 'profile-header-image'
    
    return(
        <div className={classToUse}>
            <span className="badge-image">
                <div className="rounded dr-avatar-image">
                    <div className="badge-bg" style={styles} itemprop="image" alt="Kenton Schoonover, MD"></div>
                 </div>
             </span>
        </div> 
    )   
}

export default DoctorBadge;