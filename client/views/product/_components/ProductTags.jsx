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
    const {fetching, value, tags, validityState} = this.props;

    var options = [];

    _.forEach(tags, (tag) => {
      options.push({
        value: tag._id, label: tag.name
      });
    });

    const selectValue = value.join(",");

    return (
      <FormGroup>
        <Label>Tags</Label>
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
  tags: [],
  value: []
};

ProductBusinessOwners.propTypes = {
  fetching: PropTypes.bool,
  tags: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
};