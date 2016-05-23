import React from 'react';

const DoctorName = ({doctor}) => {
    var _titulo = (doctor.sexo == 'F') ? 'Dra.' : 'Dr';
    return(
        <div className="ui column">
           <h1 className="ui bg-mcwDark huge label">{_titulo} { doctor.nombre } { doctor.apellido }</h1>
           <h3 className="color-mcwDark doctor-specialty">
                {doctor.especialidad}, {doctor.sub_especialidad}
           </h3>
        </div>
    )
}

export default DoctorName;