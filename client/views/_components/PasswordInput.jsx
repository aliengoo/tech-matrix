import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import Errors from './Errors.jsx';

const Debounce = 1000;
const MaxLength = 60;
const MinLength = 8;

export default class PasswordInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, props.debounce).bind(this);
    this.componentName = this.constructor.name;
    this.ErrorMessagesMap = {
      valueMissing: "Password is required",
      tooShort: `Password should be a minimum of ${this.props.minLength} characters`,
      tooLong: `Password should be a maximum of ${this.props.maxLength} characters`
    };
  }

  onChange() {
    this.props.onChange(this.refs[this.componentName].value);
  }

  render() {
    const {defaultValue, minLength, maxLength, validityState} = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Password</Label>
          <input
            type="password"
            className="form-control"
            required
            minLength={minLength}
            maxLength={maxLength}
            defaultValue={defaultValue}
            ref={this.componentName}
            name={this.componentName}
            id={this.componentName}
            onChange={this.onChange}/>
          <Errors validityState={validityState} errorMessagesMap={this.ErrorMessagesMap}/>
        </FormGroup>
      </div>
    );
  }
}

PasswordInput.defaultProps = {
  debounce: Debounce,
  minLength: MinLength,
  maxLength: MaxLength
};

PasswordInput.propTypes = {
  debounce: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
};