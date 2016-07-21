// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {default as NavBar} from "../components/NavBar";
import SessionTracker from "../components/SessionTracker";
import AppTheme from "../settings/AppTheme";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends React.Component{
  componentDidMount() {


  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(AppTheme)
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={AppTheme}>
      <div>
          <NavBar/>
          <main className="ui page grid main content-container">
            <div className="row">
              <SessionTracker/>
              {this.props.children}
            </div>
          </main>
        </div>
      </MuiThemeProvider>
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
