/**
 * Created by epotignano on 13/4/16.
 */

import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import AvailabilityDisplayer from '../components/AvailabilityDisplayer';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class InstitutionDisplayer extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedAppointment: {}
    }
  }

  render() {

    const { institution } = this.props;
    const position = [51.505, -0.09];

    return(
      <div className="ui segment">
        <div className="ui grid stackable container">
          <div className="ui row">
            <div className="ui column grid">

                <Map center={position} zoom={13}>
                  <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    </Popup>
                  </Marker>
                </Map>
              
              <h1 className="ui blue header inverted">
                { institution.name }
              </h1>
            </div>
          </div>
          <div className="ui row">
            <div className="ui column grid">
              <div className="ui column">
                <AvailabilityDisplayer availability={institution.availability}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InstitutionDisplayer.propTypes = {
  institution : PropTypes.any
};

function mapStateToProps(state) {
  return state;
}

InstitutionDisplayer = connect(mapStateToProps)(InstitutionDisplayer);

export default InstitutionDisplayer;
