/**
 * Created by epotignano on 09/03/16.
 */

import React, { Component, PropTypes } from 'react';
import { FireRef, UidRef} from '../constants/Commons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData : {}
    }
  }

  componentDidMount() {

  }

  render() {

    var _renderImage = (this.state.userData && this.state.userData.avatar) ? this.state.userData.avatar.url : 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y';


    return (
      <div>
        <img className="ui avatar image"
             src={_renderImage}
             alt="User avatar"
        />
        <span className="computer tablet only row">
          { this.state.userData.username }
        </span>
      </div>

    )
  }
}


UserAvatar.propTypes = {
  userId : PropTypes.number
};

function mapStateProps(state) {
   const { user } = state;
    return { user }
}


export default connect()(UserAvatar);
