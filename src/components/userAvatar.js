/**
 * Created by epotignano on 09/03/16.
 */

import React, { Component, PropTypes } from 'react';
import { FireRef, UidRef} from '../constants/Commons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Rebase from 're-base'
const base = Rebase.createClass(FireRef)

class UserAvatar extends Component {


  constructor(props) {
    super(props)
    this.state = {
      userData : {}
    }
  }

  componentDidMount() {
    base.listenTo('users/1', {
      context: this,
      asArray: false,
      then(imageUrl) {
        console.log(imageUrl);
        this.setState({
          userData : imageUrl
        })
      }
    })
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
