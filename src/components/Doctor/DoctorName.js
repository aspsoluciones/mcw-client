import React from 'react';

const DoctorName = ({doctor}) => {
    var _titulo = (doctor.sexo == 'F') ? 'Dra.' : 'Dr';
    return(
        <div className="ui column">
           <h1 className="ui black huge label">{_titulo} { doctor.nombre } { doctor.apellido }</h1>
           <h5>
            {doctor.especialidad}, {doctor.sub_especialidad}
           </h5>
        </div>
    )
}

export default DoctorName;