import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import BaseInput from './BaseInput';

export default class TextInput extends BaseInput {

  constructor(props) {
    super(props);
  }

  render() {
    return (<input {...super.getAttributes()} onChange={super.onChange} type="text"/>);
  }
}