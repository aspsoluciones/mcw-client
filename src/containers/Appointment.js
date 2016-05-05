/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { GetAppointments }  from '../actions/Appointments';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import InstitutionDisplayer from '../components/InstitutionDisplayer';
import Loader from '../components/Loader';
import moment from 'moment';

class Appointment extends Component {
    constructor(props) {
      super(props);
      const position = [51.505, -0.09];


      let mockDate = moment();

      let _mockData = {
        "doctor": {
          "especialidad": 'Odontologo',
          "sub_especialidad": 'Odontopediatría',
          "area_de_atencion": 'Area de Atención',
          "edades_de_atencion": ['Niños', 'Adultos Mayores', 'Adultos'],
          "comentario_publico": 'Los pilares de mi práctica profesional son la atención y servicio de excelencia brindado a mis pequeños pacientes',
          "nombre": 'Ana Maria',
          "apellido": 'García',
          "apellido_de_casada": 'Pérez',
          "nombre_usual": 'Anita ?',
          "sexo": 'f',
          "foto_url": 'http://www.lafm.com.co/sites/default/files/imagecache/600xy/imagenes/anamariagonzalez2_1411991352.jpg',
          "titulo": 'Dra',
          "id": '1'
        },
        "locations": [
          {
            "location": {
              "nombre": 'Hospital Subzonal de Bolívar',
              "direccion": 'Fabrés García 100',
              "ciudad": 'San Carlos de Bolívar',
              "corregimiento": 'Partido de Bolívar',
              "provincia": 'Buenos Aires',
              "pais": 'Argentina',
              "coordenadas": position,
              "telefono_contacto": '2314445544',
              "id": 50
            },
            "appointments": [
              {
                "fecha_hora_inicio": mockDate.minute(30),
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": mockDate.minute(60),
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": mockDate.minute(90),
                "duracion_en_minutos": 30
              }
            ]
          },
          {
            "location": {
              "nombre": 'Hospital de Olavarria',
              "direccion": 'Las heras 860',
              "ciudad": 'Olavarría',
              "corregimiento": 'Partido de Olavarría',
              "provincia": 'Buenos Aires',
              "pais": 'Argentina',
              "coordenadas": position,
              "telefono_contacto": '22569994949',
              "id": 40
            },
            "appointments": [
              {
                "fecha_hora_inicio": mockDate.minute(30),
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": mockDate.minute(60),
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": mockDate.minute(90),
                "duracion_en_minutos": 30
              }
            ]
          }
        ]
      };

      this.state = {
        response: {
          data: _mockData
        },
        data: _mockData
      };
    }

  componentDidMount(){
    const { store, router } = this.context;
    const { dispatch } = this.props;

    let initialDate = {
      minDate: moment().format("MM-DD-YYYY"),
      maxDate: moment().add('d',6).format("MM-DD-YYYY")
    }
    dispatch(GetAppointments(this.props.params.doctorUsername, initialDate))

    store.subscribe(() =>{
      var _state = store.getState();
      if(_state.appointment.keep) {
        router.push({
          pathname: '/doctor/' + this.props.params.doctorUsername + '/appointment/checkout'
        })
      }
    })


  }

    renderAppointmentScreen(appointment){

      if(appointment.data) {
        return (
          <div className="ui one column grid">
            <div className="ui column">
              { DoctorProfileCard(appointment.data.responsable_servicio)}
            </div>
            <div className="ui column">
              {
                appointment.data.localidades.map((location, i) =>{
                  return <div className="ui grid one column" key={i}>
                    <div className="ui column" key={i}>
                      <InstitutionDisplayer institution={location} doctor={appointment.data.responsable_servicio}key={i}/>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        )
      }

      return null;


    }

    render() {
      const { appointment } = this.props;
      const {loading} = appointment;

      let _render = (loading) ? (<Loader/>) : this.renderAppointmentScreen(appointment);


      return _render;
    }
}

function mapStateToProps(state) {
  const { appointment } = state;
  return {
    appointment
  }
}

Appointment.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
