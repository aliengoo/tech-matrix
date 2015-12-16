import _ from 'lodash';
import ReactDOM from 'react-dom';
import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import ErrorBlock from './ErrorBlock.jsx';

const MaxLength = 50;

export default class UsernameInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, 500).bind(this);
    this.componentName = this.constructor.name;
  }

  onChange() {
    this.props.onChange(this.refs[this.componentName].value);
  }

  render() {
    const {defaultValue, children, label, type, placeholder} = this.props;

    return (
      <div>
        <FormGroup>
          <Label>{label}</Label>
          <input
            type={type}
            placeholder={placeholder}
            className="form-control"
            required
            defaultValue={defaultValue}
            ref={this.componentName}
            name={this.componentName}
            id={this.componentName}
            maxLength={MaxLength}
            onChange={this.onChange}/>
          {this.renderTypeMismatchErrorBlock()}
          {this.renderRequiredErrorBlock()}
          {this.renderTooLongErrorBlock()}
          {children}
        </FormGroup>
      </div>
    );
  }

  renderTypeMismatchErrorBlock() {
    const {validityState} = this.props;
    const typeMismatch = _.get(validityState, 'typeMismatch', false);
    return typeMismatch ? (<ErrorBlock>Not a valid email address</ErrorBlock>) : <div></div>;
  }

  renderRequiredErrorBlock() {
    const {validityState} = this.props;
    var valueMissing = _.get(validityState, "valueMissing", false);
    return valueMissing ? (<ErrorBlock>Username is required</ErrorBlock>) : <div></div>;
  }

  renderTooLongErrorBlock() {
    const {validityState} = this.props;
    var tooLong = _.get(validityState, "tooLong", false);
    return tooLong ? (<ErrorBlock>Username can be a maximum of {MaxLength} characters</ErrorBlock>) : <div></div>;
  }
}

UsernameInput.defaultProps = {
  label: "Username",
  type: "text",
  placeholder: ""
};

UsernameInput.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired
};