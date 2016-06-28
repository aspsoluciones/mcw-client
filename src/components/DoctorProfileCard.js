/**
 * Created by epotignano on 12/4/16.
 */

import React from 'react';


function categories(focuses) {
  return <div>
    Enfoques:
  </div>
}

function renderAge(age){
  return (
    <div>
      { age }
    </div>
  )
}


export function DoctorProfileCard(doctorData) {
  return  <div className="ui vertical stripe segment">
            <div className="ui middle aligned grid container">
              <div className="ui row segment no-padded-segment">
                <div className="six wide column no-padded">
                  <div className="ui column">
                    <image className="ui image medium" src={doctorData.foto_url}/>
                  </div>
                </div>
                <div className="eight wide right floated column">
                  <div className="ui column">
                    <h3 className="ui header">{ doctorData.titulo } {doctorData.apellido} {doctorData.nombre}</h3>
                  </div>
                  <div className="ui column">
                    { doctorData.especialidad }, { doctorData.sub_especialidad}
                  </div>

                  <div className="ui column">
                    Edades:
                
                  </div>
                  <div className="ui column">
                    { doctorData.comentario_publico}
                  </div>
                </div>
            </div>
          </div>
        </div>
}
