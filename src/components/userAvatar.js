/**
 * Created by epotignano on 09/03/16.
 */

import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UserAvatar extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <img className="ui avatar image"
             src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
             alt="User avatar"
        />
        <span className="computer tablet only row">
          Mock User
        </span>
      </div>

    )
  }
}


UserAvatar.propTypes = {
  userData: PropTypes.object
};

function mapStateProps(state) {
   const { user } = state;
    
    return { user }
}


export default connect()(UserAvatar);
