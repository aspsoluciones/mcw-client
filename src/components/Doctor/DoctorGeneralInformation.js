import React from 'react';

const DoctorGeneralInformation = ( { doctor } ) => {
    
    return(
        <div>
            <h3 className="color-mcwDark" style={{marginBottom: 0}}>
                <i className="doctor icon"></i>Información general
            </h3>
            <table className="ui table">
                <tbody>
                    <tr>
                        <td>Sobre mi</td>
                        <td>Sé que puedo hacer una diferencia en la vida de mis pacientes</td>        
                    </tr>
                    <tr>
                        <td>Idiomas</td>
                        <td>English, Español</td>        
                    </tr>
                </tbody>
                
            </table>
        </div>
    )
    
}

export default DoctorGeneralInformation;