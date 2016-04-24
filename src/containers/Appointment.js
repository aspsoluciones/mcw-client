/**
 * Created by epotignano on 12/4/16.
 */
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DoctorProfileCard } from '../components/DoctorProfileCard';
import InstitutionDisplayer from '../components/InstitutionDisplayer';

class Appointment extends Component {
    constructor(props) {
      super(props);
      const position = [51.505, -0.09];
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
                "fecha_hora_inicio": "0001-01-01T00:00:00",
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": "0001-01-01T00:00:00",
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": "0001-01-01T00:00:00",
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
                "fecha_hora_inicio": "0001-01-01T00:00:00",
                "duracion_en_minutos": 30
              },
              {
                "fecha_hora_inicio": "0001-01-01T00:00:00",
                "duracion_en_minutos": 45
              },
              {
                "fecha_hora_inicio": "0001-01-01T00:00:00",
                "duracion_en_minutos": 45
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
    console.log(this);
    const { store, router } = this.context;
    store.subscribe(() =>{
      var _state = store.getState();
      if(_state.appointment.keep) {
        router.push({
          pathname: '/doctor/' + this.props.params.doctorUsername + '/appointment/checkout'
        })
      }
    })
  }

    render() {
      console.log(this.props.params);

      return(<div className="ui grid">
        <div className="">
          { DoctorProfileCard(this.state.data.doctor)}
        </div>
        /*{
          this.state.data.locations.map((location, i) =>{
            return <div className="ui row" key={i}>
              <div className="ui column">
                <InstitutionDisplayer institution={location}/>
              </div>
            </div>
          })
        }*/
      </div>)
    }
}

function mapStateToProps(state) {
  return state;
}

Appointment.contextTypes = {
  store: PropTypes.any,
  router: PropTypes.any
};

Appointment = connect(mapStateToProps)(Appointment);

export default Appointment;
