import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';
import Select from 'react-select';

export default class ProductRelatedProducts extends Component {

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
        <Label>Related products</Label>
        <Select
          placeholder="e.g. Windows 2008"
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

ProductRelatedProducts.defaultProps = {
  options: [],
  value: []
};

ProductRelatedProducts.propTypes = {
  fetching: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
};