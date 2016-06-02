/**
 * Created by epotignano on 9/4/16.
 */
import React, { Component, PropTypes } from 'react';

class Loader extends Component {
  render() {
    let { size } = this.props;
    if(!size) { size = 'medium'}
    const { loaderText, inverted } = this.props;

    const loaderClass = (!inverted) ? 'ui active dimmer' : 'ui inverted active dimmer';
    return (
      <div>
        <div className={loaderClass}>
          <div className={"ui " + size + " text loader"}>{(this.props.loaderText || 'Cargando')}</div>
        </div>
        <p></p>
        <p></p>
        <p></p>
      </div>

    )
  }
}

Loader.propTypes = {
  size: PropTypes.string,
  inverted: PropTypes.bool,
  loaderText: PropTypes.string
};

export default Loader;
