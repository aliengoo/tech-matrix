import _ from 'lodash';
import ReactDOM from 'react-dom';
import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import Errors from './Errors.jsx';

const MaxLength = 50;

export default class UsernameInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, this.props.debounce).bind(this);
    this.componentName = this.constructor.name;
    this.ErrorMessagesMap = {
      valueMissing: "Username is required",
      tooLong: `Username has a maximum length of ${this.props.maxLength} characters`,
      typeMismatch: `Username expected and email`
    };
  }

  onChange() {
    this.props.onChange(this.refs[this.componentName].value);
  }

  render() {
    const {
      defaultValue,
      label,
      placeholder,
      maxLength,
      validityState,
      customValidityState,
      customErrorMessagesMap
    } = this.props;

    return (
      <div>
        <FormGroup>
          <Label>{label}</Label>
          <input
            type="email"
            placeholder={placeholder}
            className="form-control"
            required
            defaultValue={defaultValue}
            ref={this.componentName}
            name={this.componentName}
            id={this.componentName}
            maxLength={maxLength}
            onChange={this.onChange}/>
          <Errors validityState={validityState} errorMessagesMap={this.ErrorMessagesMap}/>
          <Errors validityState={customValidityState} errorMessagesMap={customErrorMessagesMap}/>
        </FormGroup>
      </div>
    );
  }
}

UsernameInput.defaultProps = {
  label: "Username",
  placeholder: "",
  debounce: 500,
  maxLength: MaxLength
};

UsernameInput.propTypes = {
  debounce: PropTypes.number,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  customValidityState: PropTypes.object,
  customErrorMessagesMap: PropTypes.object,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
};