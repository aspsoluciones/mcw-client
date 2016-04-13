/**
 * Created by epotignano on 12/4/16.
 */

import React from 'react';
export function DoctorProfileCard(doctorData) {
  return <div className="ui stackable column centered grid">
    <div className="ui row">
      <div className="ui two column centered grid">
          <div className="column">
            <image className="ui small image circular" src="../assets/DrChapatin.jpg"/>
          </div>
          <div className="column">
            <h1> { doctorData.lastName } { doctorData.firstName }</h1>
            <h5>
              {doctorData.categories[0]}, {doctorData.categories[1]}
            </h5>
          </div>
      </div>

      <div className="ui four wide column">
        <h4>Something else</h4>
      </div>
    </div>
    <div className="ui row">
      <div className="ui four wide column">

      </div>
      <div className="ui twelve wide column">
        <h5>
          { doctorData.selfReview }
        </h5>
      </div>
    </div>

  </div>
}


