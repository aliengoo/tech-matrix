"use strict";

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';

export default class ProductMaintenanceNotes extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, 1000).bind(this);
  }

  onChange(value) {
    this.props.onChange(value);
  }

  render() {
    const {value} = this.props;

    return (
      <FormGroup>
        <Label>Maintenance notes</Label>
        <textarea row="10" col="10" className="form-control" defaultValue={value} onChange={this.onChange}/>
      </FormGroup>
    );
  }
}

ProductMaintenanceNotes.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};