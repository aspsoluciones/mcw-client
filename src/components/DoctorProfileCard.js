/**
 * Created by epotignano on 12/4/16.
 */

import React from 'react';


function categories(focuses) {
  return <div>
    Enfoques:
  </div>
}


export function DoctorProfileCard(doctorData) {
  return  <div className="ui vertical stripe segment">
            <div className="ui middle aligned grid container">
              <div className="ui row segment no-padded-segment">
                <div className="six wide column no-padded">
                  <div class="ui column">
                    <image className="ui image medium" src="../assets/DrChapatin.jpg"/>
                  </div>
                </div>
                <div className="eight wide right floated column">
                  <div className="ui column">
                    <h3 className="ui header">Dr. {doctorData.lastName} {doctorData.firstName}</h3>
                  </div>
                  <div className="ui column">
                    <h5 className="ui header">{doctorData.categories[0]}, {doctorData.categories[1]}</h5>
                  </div>
                  <div className="ui column">
                    <span> Enfoques:</span><a className="ui blue image label">
                    <img src="../assets/DrChapatin.jpg"/>
                    { doctorData.focuses[0]}
                  </a>
                  </div>
                </div>
            </div>
          </div>
        </div>
}


