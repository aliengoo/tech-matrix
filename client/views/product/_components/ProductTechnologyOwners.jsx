import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';
import Select from 'react-select';

export default class ProductTechnologyOwners extends Component {

  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange, 1000).bind(this);
  }

  onChange(rawValues) {
    this.props.onChange(rawValues.split(','));
  }

  render() {
    const {fetching, value, people, validityState} = this.props;

    var options = [];

    _.forEach(people, (person) => {
      options.push({
        value: person, label: person
      });
    });

    const selectValue = value.join(",");

    return (
      <FormGroup>
        <Label>Technology owners</Label>
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

ProductTechnologyOwners.defaultProps = {
  people: [],
  value: []
};

ProductTechnologyOwners.propTypes = {
  fetching: PropTypes.bool,
  people: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
};