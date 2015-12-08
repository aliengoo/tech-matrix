"use strict";

import React, {Component, PropTypes} from 'react';

export default class InputGroup extends Component {
  render() {




    return (
      <div className="form-group">
        {this.props.children}
      </div>);
  }
}

InputGroup.propTypes = {
  hasError: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  hasWarning: PropTypes.bool
};