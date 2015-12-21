import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import FormGroupInput from '../../_components/FormGroupInput.jsx';

export default class ProductsFilter extends Component {
  constructor(props) {
    super(props);
    this.componentName = this.constructor.name;
    this._onFilter = this._onFilter.bind(this);
  }

  _onFilter() {
    // parsing and validate before issuing the filter request
  }

  render() {
    const {fetching, onFilter} = this.props;
    return (
      <form name="productFilterForm" noValidate>
        <div className="panel panel-default">
          <div className="panel-heading">
            <header>
              <h4>Filter</h4>
            </header>
          </div>
          <div className="panel-body">

            <FormGroupInput name="productName" label="Product name">
            </FormGroupInput>

            <FormGroupInput name="productVendor" label="Vendor">
            </FormGroupInput>
          </div>
          <div className="panel-footer">
            <button className="btn btn-primary" type="button" onClick={this._onFilter}>Filter</button>
          </div>
        </div>
      </form>
    );
  }
}

ProductsFilter.propTypes = {
  fetching: PropTypes.bool,
  onFilter: PropTypes.func.isRequired
};