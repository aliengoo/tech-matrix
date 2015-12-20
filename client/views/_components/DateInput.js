import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import BaseInput from './BaseInput';

export default class DateInput extends BaseInput {

  constructor(props) {
    super(props);
  }

  render() {
    return (<input {...super.getAttributes()} onChange={super.onChange} type="text"/>);
  }
}

DateInput.propTypes = {
  setElementState: PropTypes.func.isRequired,
  required: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.string
};


