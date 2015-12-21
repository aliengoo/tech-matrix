import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';
import Select from 'react-select';
import ElementState from '../../_common/ElementState';

export default class ProductBusinessOwners extends Component {

  constructor(props) {
    super(props);
    this._onChange = _.debounce(this._onChange, 1000).bind(this);
    this.elementState = new ElementState();
    this.componentName = this.constructor.name;
  }

  _onChange(rawValues) {
    var arr = rawValues.split(',');
    this.props._onChange();
  }

  render() {
    const {fetching, value, options, validityState} = this.props;
    const selectValue = value.join(",");

    return (
      <FormGroup>
        <Label>Business owners</Label>
        <Select
          required={true}
          name={this.componentName}
          ref={this.componentName}
          multi={true}
          value={selectValue}
          delimiter={","}
          onChange={this._onChange}
          options={options}
          isLoading={fetching}/>
      </FormGroup>
    );
  }
}

ProductBusinessOwners.defaultProps = {
  options: [],
  value: []
};

ProductBusinessOwners.propTypes = {
  fetching: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.array,
  onElementStateChange: PropTypes.func.isRequired
};