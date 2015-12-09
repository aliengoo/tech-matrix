"use strict";

import React, {Component, PropTypes} from 'react';

export default class FormGroup extends Component {
  render() {
    const {hasError, hasWarning, hasSuccess} = this.props;

    const className = `form-group
      ${hasError ? 'has-error' : ''}
      ${hasSuccess ? 'has-success' : ''}
      ${hasWarning ? 'has-warning' : ''}
      `;

    return (
      <div className={className}>
        {this.props.children}
      </div>);
  }
}

FormGroup.propTypes = {
  hasError: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  hasWarning: PropTypes.bool
};