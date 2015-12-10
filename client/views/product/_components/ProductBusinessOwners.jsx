import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';
import Select from 'react-select';

export default class ProductBusinessOwners extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, 1000).bind(this);
  }

  onChange(rawValues) {
    this.props.onChange(rawValues.split(','));
  }

  render() {
    const {fetching, value, options, validityState} = this.props;
    const selectValue = value.join(",");

    return (
      <FormGroup>
        <Label>Business owners</Label>
        <Select
          multi={true}
          value={selectValue}
          delimiter={","}
          onChange={this.onChange}
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
  onChange: PropTypes.func.isRequired
};