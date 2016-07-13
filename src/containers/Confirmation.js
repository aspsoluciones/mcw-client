import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
//import { VerifyAppointment } from '../actions/Appointments';
import axios from 'axios';

class Confirmation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: "Espere por favor..."
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    axios.post('/solicitudes/verificar/' + this.props.params.confirmationId)
    .then((data)=> {
      this.setState({ status: "Su solicitud fue confirmada satisfactoriamente." });
    }).catch((error) => {
      if(error.status == 400) {
        this.setState({ status: "Su solicitud no existe ó ha expirado. Por favor, intente nuevamente" });  
      }
      else {
        this.setState({ status: "Ha ocurrido un problema. Por favor pongase en contacto con el administrador" });  
      }
    })
  }
  
  render() {
    return (
      <div className="ui container">
        <br />
        <div className="ui center aligned">
          <h3>{this.state.status}</h3>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { confirmation } = state;
  return {
    confirmation
  };
}

Confirmation.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Confirmation = connect(mapStateToProps)(Confirmation);

export default Confirmation;
