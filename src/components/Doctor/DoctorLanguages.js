import React from 'react';

const DoctorLanguages = ({languages}) => {

    if(languages && languages.length) {
            return(<div>
                <strong className="color-mcwDark">Idiomas </strong>
                {
                    languages.map((language, i) =>  {
                        return (<div key={i} className="ui bg-mcwDark left pointing label">
                            <span>{language}</span>
                        </div>)
                    })
                }
            
            </div>)
        }
   
}

export default DoctorLanguages;

