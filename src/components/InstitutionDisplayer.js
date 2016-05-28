/**
 * Created by epotignano on 13/4/16.
 */

import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import AvailabilityDisplayer from '../components/AvailabilityDisplayer';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const style = {
  marginRight: 20
};

function parseCoordinates(coordinatesString){
  var _str = coordinatesString.split(";")
  var _coordinates = [] 
  _coordinates[0] = parseFloat(_str[0]);
  _coordinates[1] = parseFloat(_str[1]);
  
  return _coordinates;
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

  renderAvailabilityDisplayer(institution, doctor){
      console.log(institution);
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
        </div>
          <AvailabilityDisplayer
            className="ui column"
            availability={institution.turnos}
            idLocalidad={institution.localidad.id}
            institution={institution}
            doctor={doctor}
            doctorUsername={this.props.doctorUsername}
          />
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
  doctor: PropTypes.any
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
