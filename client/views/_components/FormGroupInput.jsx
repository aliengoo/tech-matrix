import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import Errors from './Errors.jsx';
import ElementState from '../_common/ElementState';

const Debounce = 1000;

export default class FormGroupInput extends Component {

  constructor(props) {
    super(props);

    this.elementState = new ElementState();
    this._onChange = _.debounce(this._onChange, this.props.debounce).bind(this);
    this._getValidityState = this._getValidityState.bind(this);
    this._getErrorMessagesMap = this._getErrorMessagesMap.bind(this);
    const {label, minLength, maxLength, min, max, step, type} = props;

    this.DefaultErrorMessagesMap = {
      valueMissing: `${label} is required`,
      typeMismatch: `${label} expected a value of type '${type}'`,
      tooShort: `${label} minimum length is ${minLength}`,
      tooLong: `${label} maximum length is ${maxLength}`,
      badInput: `${label} is a bad input`,
      customError: `${label} is invalid`,
      patternMismatch: `${label} is not a valid format`,
      rangeOverflow: `${label} has a value greater than ${max}`,
      rangeUnderflow: `${label} has a value less than ${min}`,
      stepMismatch: `${label} has a value that is not valid with the step value ${step}`
    };
  }

  componentDidMount() {
    this.input = document.querySelector(`[name="${this.props.name}"]`);
    this.props.elementStateChanged(
      this.elementState.evaluate(this.input));
  }

  _onChange() {
    this.props.elementStateChanged(
      this.elementState.evaluate(this.input));
  }

  _getErrorMessagesMap() {
    return Object.assign({}, this.DefaultErrorMessagesMap, this.props.errorMessagesMap);
  }

  _getValidityState() {
    return Object.assign(
      _.get(this.elementState.state, "validity", {}), this.props.customValidityState);
  }

  _parseHtmlAttributes() {
    const nonHtmlProps = [
      "elementStateChanged",
      "debounce",
      "customValidityState",
      "errorMessagesMap"
    ];

    return _.pick(this.props, (value, key) => {
      return value !== undefined && nonHtmlProps.indexOf(key) === -1;
    });
  }

  render() {
    const {
      children,
      label
    } = this.props;

    const validityState = this._getValidityState();
    const errorMessagesMap = this._getErrorMessagesMap();
    const attributes = this._parseHtmlAttributes();

    const errors = this.elementState.state.dirty ?
      (<Errors errorMessagesMap={errorMessagesMap} validityState={validityState}/>) : <div></div>;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <input
          className="form-control"
          {...attributes}
          onChange={this._onChange}/>
        {errors}
        {children}
      </FormGroup>
    );
  }
}

FormGroupInput.defaultProps = {
  debounce: Debounce
};

FormGroupInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  elementStateChanged: PropTypes.func.isRequired,
  debounce: PropTypes.number,
  customValidityState: PropTypes.object,
  errorMessagesMap: PropTypes.object
};