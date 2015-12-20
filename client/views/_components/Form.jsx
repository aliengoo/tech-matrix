"use strict";

import React, {Component, PropTypes} from 'react';

export default class Form extends Component {

  render() {
    const {name, children} = this.props;

    return (
      <form name={name} noValidate>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired
};