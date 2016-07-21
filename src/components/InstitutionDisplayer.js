/**
 * Created by epotignano on 13/4/16.
 */

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import AvailabilityDisplayer from "../components/AvailabilityDisplayer";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

const style = {
  marginRight: 20
};

function parseCoordinates(coordinatesString){
  if(coordinatesString) {
    var _separator = (coordinatesString.indexOf(";") != -1) ? ";" : (coordinatesString.indexOf(",") != -1) ? ',' : null
    var _str = coordinatesString.split(_separator);
    var _coordinates = []
    _coordinates[0] = parseFloat(_str[0]);
    _coordinates[1] = parseFloat(_str[1]);
    return _coordinates;
  } else {
    return null;
  }

}

function parseContacts(institution){
  var _str = {title: null, subTitle: null};
  if(institution.localidad.contactos && institution.localidad.contactos.length) {
    _str.title = (institution.localidad.contactos[0]) ? institution.localidad.contactos[0].valor: 'No hay información disponible';
    _str.subTitle = (institution.localidad.contactos[1]) ? institution.localidad.contactos[1].valor : 'No hay información disponible';
    _str.nombreLocalidad = (institution.localidad.nombre) ? institution.localidad.nombre : 'No hay información disponible'
  }

  return _str;

}

class InstitutionDisplayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedAppointment: {}
    }
  }

  renderMap(position, contact){

    if(position) {
      return (
        <Map className="ui column map" center={position} zoom={13} zoomControl={true} scrollWheelZoom={false}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <span>{contact.title}<br/> - {contact.subTitle}</span>
              </Popup>
            </Marker>
          </Map>
      )
    }

  }

  renderAvailabilityDisplayer(institution, doctor){
      const position = parseCoordinates(institution.localidad.coordenadas)
      const contact = parseContacts(institution)
      return (
        <div className="ui one column grid segment">
        <div className="ui one column grid mapContainer">
          <div className="mapTitle">
            <div className="title">
              { contact.nombreLocalidad }
            </div>
            <div className="subTitle">
             { contact.title }
            </div>
            <div className="subTitle">
             { contact.subTitle }
            </div>
          </div>
          { this.renderMap(position, contact) }
        </div>
          <div className="ui one column">
            <AvailabilityDisplayer
              className="ui column availabilityDisplayer"
              availability={institution.turnos}
              idLocalidad={institution.localidad.id}
              institution={institution}
              doctor={doctor}
              languageJson={this.props.languageJson}
              doctorUsername={this.props.doctorUsername}
            />
          </div>

        </div>
    )
  }

  render() {
    const { institution, doctor } = this.props;

    return(
        <div>
          { this.renderAvailabilityDisplayer(institution, doctor)}
        </div>
    );
  }
}

InstitutionDisplayer.propTypes = {
  institution : PropTypes.any,
  doctor: PropTypes.any,
  languageJson: PropTypes.any
};

InstitutionDisplayer.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

function mapStateToProps(state) {
  const { appointment } = state;

  return {
    appointment
  };
}

InstitutionDisplayer = connect(mapStateToProps)(InstitutionDisplayer);

export default InstitutionDisplayer;
