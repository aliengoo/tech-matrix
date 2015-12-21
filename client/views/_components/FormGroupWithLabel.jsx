import React, {Component, PropTypes} from 'react';
import FormGroup from './FormGroup.jsx';
import Label from './Label.jsx';

export default class FormGroupWithLabel extends Component {
  render() {
    return (
      <FormGroup>
        <Label>{this.props.label}</Label>
        {this.props.children}
      </FormGroup>
    );
  }
}

FormGroupWithLabel.propTypes = {
  label: PropTypes.node.isRequired
};