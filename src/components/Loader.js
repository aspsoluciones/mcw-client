/**
 * Created by epotignano on 9/4/16.
 */
import React, { Component, PropTypes } from 'react';

class Loader extends Component {
  render() {
    let { size } = this.props;
    if(!size) { size = 'medium'}

    return (
      <div>
        <div className="ui active dimmer">
          <div className={"ui " + size + " text loader"}>Loading</div>
        </div>
        <p></p>
        <p></p>
        <p></p>
      </div>

    )
  }
}

Loader.propTypes = {
  size: PropTypes.string
};

export default Loader;
