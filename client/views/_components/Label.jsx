"use strict";

import React, {Component, PropTypes} from 'react';

export default class Label extends Component {
  render() {
    let attributes = Object.assign({}, {
      className: "control-label"
    }, this.props);

    return React.createElement("label", attributes, this.props.children);
  }
}

Label.propTypes = {
  htmlFor: PropTypes.string
};