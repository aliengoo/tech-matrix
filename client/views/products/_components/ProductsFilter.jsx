import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class ProductsFilter extends Component {
  constructor(props) {
    super(props);
    this.onChange = _.debounce(this.onChange).bind(this);
  }

  onChange(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    return (
      <input
        className="form-control"
        type="text"
        onChange={this.onChange}
        placeholder="enter a search..."/>
    );
  }
}

ProductsFilter.propTypes = {
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};