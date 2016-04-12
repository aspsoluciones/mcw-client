/**
 * Created by epotignano on 19/02/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import UserAvatar  from './userAvatar';

import { UidRef } from '../constants/Commons';
var uid = localStorage.getItem(UidRef);
function generateRightMenu(isAuthenticated, router) {

  if(isAuthenticated) {
    return(
    <a className="ui dropdown item"><UserAvatar className="item"/>
      <i className="dropdown icon"></i>
      <div className="menu">
        <div className="item">My Page</div>
        <div className="ui divider"></div>
        <div className="item">Log out</div>
      </div>
    </a>
    )
  }

  return(
    <Link className="item" to="/access/login">Login</Link>
  )
}

class NavBar extends React.Component {
  componentDidMount() {
    $('.ui.dropdown.item').dropdown();
  }

  componentDidUpdate() {
    $('.ui.dropdown.item').dropdown('refresh')
  }
  render() {
    const { router } = this.context;

    return (
      <nav className="ui inverted fixed menu navbar page grid">
        <div className="row">
          <div className="ui inverted fixed menu navbar page grid">
            <div className="right menu">
              TEST
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

var mapStateProps = function(state) {
  const { auth, user } = state;

  return  {
    auth,user
  }
};

export default connect(mapStateProps)(NavBar);
