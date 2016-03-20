// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as NavBar } from "../components/NavBar";
import Firebase from 'firebase';
import { FireRef } from '../constants/Commons';
import { getUser } from '../actions/UserActions'
import ActionNotifications from '../components/ActionNotifications';

//TODO Remove, is only for test purposes
let messages = {
  'IMAGE_UPLOAD': {
    error: 'Error al intentar subir la nueva imágen',
    success: 'Nueva imágen subida con éxito'
  }
}

class App extends React.Component{

  componentDidMount() {
    let _instance = new Firebase(FireRef);
    var _status = _instance.getAuth();
    if(_status) {
      getUser();
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <main className="ui page grid main content-container">
          <ActionNotifications entityToObserveUrl="users/1/doneJobs" messages={messages}/>
          <div className="row">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
