/**
 * Created by epotignano on 19/02/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import UserAvatar  from './userAvatar';
import { changeLanguage } from '../actions/UserActions';
import { UidRef, UserLanguage } from '../constants/Commons';

var uid = localStorage.getItem(UidRef);
var language = localStorage.getItem(UserLanguage);

class NavBar extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    /*$('.ui.dropdown').dropdown({
      onChange: function(value, text, $selectedItem) {
        dispatch(changeLanguage(value));
        localStorage.setItem(UserLanguage, value);
      }
    });*/
  }

  componentDidUpdate() {
    /*$('.ui.dropdown').dropdown('refresh')*/
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
            <div className="ui floating dropdown labeled search icon inverted white basic button pointer" style={{boxShadow: '0 0 0 0 rgb(0, 0, 0) inset!important'}}>
              <i className="world icon"></i>
              <span className="text">{defaultText}</span>
              <div className="menu">
                <div className="item" value="es-PA">es-PA</div>
                <div className="item" value="es-AR">es-AR</div>
                <div className="item" value="en-US">en-US</div>
              </div>
            </div>
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

var mapStateProps = function(state) {
  const { auth, user } = state;

  return  {
    auth,user
  }
};

export default connect(mapStateProps)(NavBar);
