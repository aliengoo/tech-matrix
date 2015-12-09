import React, {Component, PropTypes} from 'react';

import _ from 'lodash';
import FormGroup from '../../_components/FormGroup.jsx';
import Label from '../../_components/Label.jsx';

export default class ProductName extends Component {

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
        <Label>Name</Label>
        <input
          className="form-control"
          required={true}
          type="text"
          placeholder="product name"
          defaultValue={value}
          name={this.constructor.name}
          onChange={this.onChange}/>
      </FormGroup>
    );
  }
}
ProductName.defaultProps = {
  value: ""
};

ProductName.propTypes = {
  fetching: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};