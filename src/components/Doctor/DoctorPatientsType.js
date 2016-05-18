import React from 'react';

const DoctorPatientsType = ({ doctor }) => {
     
    const { atencion_adultos, atencion_adultos_mayores, atencion_bebes, atencion_ninos } = doctor
       
    const atencion_adultosLabel = (atencion_adultos) ? ( <div className="ui black left pointing label">Adultos </div>) : null
    const atencion_adultos_mayoresLabel = (atencion_adultos_mayores) ? ( <div className="ui black left pointing label">Adultos  Mayores</div>) : null
    const atencion_bebesLabel = (atencion_bebes) ? ( <div className="ui black left pointing label">Bebes</div>) : null
    const atencion_ninosLabel = (atencion_ninos) ? ( <div className="ui black left pointing label">Niños</div>) : null
    
    return (
        <div>
            <span>Enfoques: </span>
            { atencion_adultosLabel }
            { atencion_adultos_mayoresLabel }          
            { atencion_bebesLabel }
            { atencion_ninosLabel }
        </div>
    )
    
    
}

export default DoctorPatientsType;