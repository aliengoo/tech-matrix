import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';

export default class ProductSupportEndDate extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, 1000).bind(this);
    this.componentName = this.constructor.name;
  }

  onChange(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    const {value} = this.props;

    return (
      <FormGroup>
        <Label>Support end date</Label>
        <input
          type="date"
          defaultValue={value}
          name={this.componentName}
          id={this.componentName}
          className={`form-control ${this.componentName}`}/>
      </FormGroup>
    );
  }
}

ProductSupportEndDate.propTypes = {
  value: PropTypes.string
};