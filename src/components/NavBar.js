/**
 * Created by epotignano on 19/02/16.
 */

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {UidRef, UserLanguage} from "../constants/Commons";
import { changeLanguage } from '../actions/UserActions';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppTheme from "../settings/AppTheme";


import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


var uid = localStorage.getItem(UidRef);
var language = localStorage.getItem(UserLanguage);
console.log(language);
class NavBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: language || 'es-PA'
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(AppTheme)};
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  componentDidUpdate() {
  }

  render() {
    const { router } = this.context;
    var { user } = this.props;
    var languageJson = user.languageJson ? user.languageJson : {};
    var defaultText = language ? language : 'Idioma';

    return (
      <nav className="ui inverted fixed menu navbar grid">
        <div className="ui container">
          <div className="right menu">
            <DropDownMenu value={this.state.value} onChange={(event, index, value) =>{
              const { dispatch } = this.props;
              dispatch(changeLanguage(value));
              localStorage.setItem(UserLanguage, value);
              this.setState({value})
            }} openImmediately={false}>
              <MenuItem value={'es-PA'} primaryText="es-PA" />
              <MenuItem value={'es-AR'} primaryText="es-AR" />
              <MenuItem value={'en-US'} primaryText="en-US" />
            </DropDownMenu>
          </div>
        </div>
      </nav>
    )
  }
}

NavBar.contextTypes = {
  router: PropTypes.any
};
NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

NavBar.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

var mapStateProps = function(state) {
  const { auth, user } = state;

  return  {
    auth,user
  }
};

export default connect(mapStateProps)(NavBar);
