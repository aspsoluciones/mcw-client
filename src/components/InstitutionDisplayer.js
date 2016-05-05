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

function institutionAddress(location) {
  return location.direccion +  ", " +  location.corregimiento + ", " + location.ciudad + ", " + location.provincia + ", " + location.pais
}

class InstitutionDisplayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedAppointment: {}
    }
  }

  render() {


    const { institution, doctor } = this.props;
    const position = [51.505, -0.09];

    return(
    <Card>
      <CardText>
        <AvailabilityDisplayer availability={institution.turnos} location={institution.localidad} doctor={doctor}/>
      </CardText>
    </Card>
    )
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
