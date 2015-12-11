import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class ProductsFilter extends Component {
  constructor(props) {
    super(props);
    this.componentName = this.constructor.name;
  }

  render() {
    const {fetching, onSearch} = this.props;
    return (
      <div className="input-group">
        <input
          disabled={fetching}
          ref={this.componentName}
          name={this.componentName}
          id={this.componentName}
          className="form-control"
          type="text"
          onChange={this.onChange}
          placeholder="enter a search..."/>
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            disabled={fetching}
            onClick={() => onSearch(this.refs[this.componentName].value)}>Search</button>
        </span>
      </div>
    );
  }
}

ProductsFilter.propTypes = {
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired
};