import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';
import Select from 'react-select';

export default class ProductDependencies extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, 1000).bind(this);
  }

  onChange(rawValues) {
    this.props.onChange(rawValues.split(','));
  }

  render() {
    const {fetching, value, productNames, validityState} = this.props;

    var options = [];

    _.forEach(productNames, (product) => {
      options.push({
        value: product, label: product
      });
    });

    const selectValue = value.join(",");

    return (
      <FormGroup>
        <Label>Dependencies</Label>
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

ProductDependencies.defaultProps = {
  productNames: [],
  value: []
};

ProductDependencies.propTypes = {
  fetching: PropTypes.bool,
  productNames: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
};