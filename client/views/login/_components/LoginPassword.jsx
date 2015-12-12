import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';

export default class LoginPassword extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange).bind(this);
    this.componentName = this.constructor.name;
  }

  onChange() {
    this.props.onChange(this.refs[this.componentName].value);
  }

  render() {
    return (
      <div>
        <FormGroup>
          <Label>Password</Label>
          <input
            type="password"
            className="form-control"
            required
            ref={this.componentName}
            name={this.componentName}
            id={this.componentName}
            onChange={this.onChange}/>
        </FormGroup>
      </div>
    );
  }
}

LoginPassword.propTypes = {
  onChange: PropTypes.func.isRequired
};