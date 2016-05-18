import React from 'react';

const DoctorName = ({doctor}) => {
    var _titulo = (doctor.sexo == 'F') ? 'Dra.' : 'Dr';
    return(
        <div>
           <h1 className="ui black huge label">{_titulo} { doctor.nombre } { doctor.apellido }</h1>
        </div>
    )
}

export default DoctorName;