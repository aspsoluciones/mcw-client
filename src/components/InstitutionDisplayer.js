/**
 * Created by epotignano on 13/4/16.
 */

import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import AvailabilityDisplayer from '../components/AvailabilityDisplayer';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const style = {
  marginRight: 20
};

class InstitutionDisplayer extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedAppointment: {},
      showContent : false
    }
  }

  toggleContent() {
    this.setState({
      showContent : !this.state.showContent
    })
  }

  render() {

    const { institution } = this.props;
    const position = [51.505, -0.09];

    var _map = (<div className="content">
      <Map center={position} zoom={13} animate={true}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <p>{institution.name}</p>
          </Popup>
        </Marker>
      </Map>
    </div>);

    var _calendar = ( <div className="content">
      <AvailabilityDisplayer availability={institution.availability}/>
    </div>);


    return(
      <div>
        <div className="ui fluid card">
          <div className="content">
            <span className="ui header">{institution.name}</span>
            <div class="right floated meta"><button onClick={this.toggleContent.bind(this)} className="ui button">
              Open
            </button></div>
          </div>
          { this.state.showContent && _map}
          { this.state.showContent && _calendar}
          <div className="extra content">
            Some extra content
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
