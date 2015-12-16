import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import ErrorBlock from './ErrorBlock.jsx';

export default class PasswordInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, props.debounce).bind(this);
    this.componentName = this.constructor.name;
  }

  onChange() {
    this.props.onChange(this.refs[this.componentName].value);
  }

  render() {
    const {defaultValue, children, minLength, maxLength} = this.props;
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
          {this.renderTooLongErrorBlock()}
          {this.renderTooShortErrorBlock()}
          {this.renderValueMissingErrorBlock()}
          {children}
        </FormGroup>
      </div>
    );
  }

  renderTooShortErrorBlock() {
    const {validityState, minLength} = this.props;

    return _.get(validityState, "tooShort", false) ? (<ErrorBlock>{`Password is too short (min ${minLength} characters)`}</ErrorBlock>) : <div></div>;
  }

  renderTooLongErrorBlock() {
    const {validityState, maxLength} = this.props;

    return _.get(validityState, "tooLong", false) ? (<ErrorBlock>{`Password is too long (min ${minLength} characters)`}</ErrorBlock>) : <div></div>;
  }

  renderValueMissingErrorBlock() {
    const {validityState} = this.props;

    return _.get(validityState, "valueMissing", false) ? (<ErrorBlock>{`Password is required`}</ErrorBlock>) : <div></div>;
  }
}

PasswordInput.defaultProps = {
  debounce: 1000,
  minLength: 8,
  maxLength: 50
};

PasswordInput.propTypes = {
  debounce: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
};