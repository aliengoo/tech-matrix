import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import ElementState from '../_common/ElementState';

export default class BaseInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange).bind(this);
    this.getAttributes = this.getAttributes.bind(this);
    this.elementState = new ElementState();
  }

  onChange(event) {
    this.props.setElementState(this.elementState.evaluate(event.target));
  }

  getAttributes() {
    return _.pick(this.props, (value) => value !== undefined && !_.isFunction(value));
  }

  render() {
    return (<input {...this.getAttributes()} onChange={this._onChange} type="text"/>);
  }
}

BaseInput.propTypes = {
  setElementState: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};


