import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';

export default class PasswordInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange).bind(this);
    this.componentName = this.constructor.name;
  }

  onChange() {
    this.props.onChange(this.refs[this.componentName].value);
  }

  render() {
    const {defaultValue, children} = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Password</Label>
          <input
            type="password"
            className="form-control"
            required
            defaultValue={defaultValue}
            ref={this.componentName}
            name={this.componentName}
            id={this.componentName}
            onChange={this.onChange}/>
          {children}
        </FormGroup>
      </div>
    );
  }
}

PasswordInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
};