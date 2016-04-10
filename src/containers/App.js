// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as NavBar } from "../components/NavBar";
import ActionNotifications from '../components/ActionNotifications';
import Loader from '../components/Loader';

//TODO Remove, is only for test purposes
let messages = {
  'IMAGE_UPLOAD': {
    error: 'Error al intentar subir la nueva imágen',
    success: 'Nueva imágen subida con éxito'
  }
}

class App extends React.Component{
  componentDidMount() {
    /*
      TODO When component mount and the first dashboard be done, we will be watching here what is going on with
      The user authorization, tokens, and so
    */

  }

  render() {
    return (
      <div>
        <NavBar/>
        <main className="ui page grid main content-container">
          <ActionNotifications entityToObserveUrl="users/1/actions" messages={messages}/>
          <div className="row">
            <Loader/>
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
function mapStateProps(state) {
  return state;
}
export default connect(mapStateProps)(App);
