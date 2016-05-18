/**
 * Created by epotignano on 19/02/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import UserAvatar  from './userAvatar';

import { UidRef } from '../constants/Commons';
var uid = localStorage.getItem(UidRef);

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
