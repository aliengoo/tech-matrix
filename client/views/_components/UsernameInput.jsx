import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';
import ErrorBlock from './ErrorBlock.jsx';

const MaxLength = 50;

export default class UsernameInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange).bind(this);
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
          {this.renderRequiredErrorBlock()}
          {this.renderTooLongErrorBlock()}
          {children}
        </FormGroup>
      </div>
    );
  }

  renderRequiredErrorBlock() {
    const {validityState} = this.props;
    var valueMissing = _.get(validityState, "valueMissing", false);
    return (<ErrorBlock hasError={valueMissing}>Username is required</ErrorBlock>);
  }

  renderTooLongErrorBlock() {
    const {validityState} = this.props;
    var tooLong = _.get(validityState, "tooLong", false);
    return (<ErrorBlock hasError={tooLong}>Username can be a maximum of {MaxLength} characters</ErrorBlock>);
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