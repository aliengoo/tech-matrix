import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import Errors from './Errors.jsx';
import ElementState from '../_common/ElementState';

const Debounce = 1000;
const Type = "text";
const MinLength = 0;
const MaxLength = 1000;
const Min = Number.MIN_VALUE;
const Max = Number.MAX_VALUE;

const SupportedTypes = [
  "text",
  "date",
  "datetime",
  "datetime-local",
  "email",
  "number",
  "password",
  "range",
  "url",
  "time",
  "tel"
];

export default class ValidatedInput extends Component {

  constructor(props) {
    super(props);

    if (SupportedTypes.indexOf(props.type) === -1) {
      throw `${props.type} is not a supported input type`;
    }

    this.ElementState = new ElementState();
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
    let input = this.refs[this.props.name];
    this.props.elementStateListener(this.ElementState.evaluate(input));
  }

  _onChange() {
    this.props.elementStateListener(
      this.ElementState.evaluate(this.refs[this.props.name]));
  }

  _getErrorMessagesMap() {
    return Object.assign({}, this.DefaultErrorMessagesMap, this.props.errorMessagesMap);
  }

  _getValidityState() {
    return Object.assign(
      _.get(this.ElementState.state, "validity", {}), this.props.customValidityState);
  }

  render() {
    const {
      children,
      name,
      type,
      minLength,
      min,
      max,
      step,
      pattern,
      required,
      maxLength,
      label,
      defaultValue,
      classes} = this.props;

    const validityState = this._getValidityState();
    const errorMessagesMap = this._getErrorMessagesMap();

    const errors = this.ElementState.state.dirty ?
      (<Errors errorMessagesMap={errorMessagesMap} validityState={validityState}/>) : <div></div>;

    var patternRegExp = new RegExp(pattern);

    return (
      <FormGroup>
        <Label>{label}</Label>
        <input
          pattern={!!pattern ? patternRegExp: undefined}
          className={`form-control ${classes || ""}` }
          type={type}
          defaultValue={defaultValue}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step || "any"}
          name={name}
          ref={name}
          onChange={this._onChange}/>
        {errors}
        {children}
      </FormGroup>
    );
  }
}

ValidatedInput.defaultProps = {
  pattern: "",
  required: false,
  debounce: Debounce,
  type: Type,
  minLength: MinLength,
  maxLength: MaxLength,
  min: Min,
  max: Max,
  customValidityState: undefined
};

ValidatedInput.propTypes = {
  pattern: PropTypes.string,
  classes: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string.isRequired,
  debounce: PropTypes.number,
  elementStateListener: PropTypes.func.isRequired,
  type: PropTypes.string,
  customValidityState: PropTypes.object,
  errorMessagesMap: PropTypes.object
};