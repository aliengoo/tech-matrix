import connectToStores from 'alt/utils/connectToStores';
import React, {Component} from 'react';
import ProductsFilter from './_components/ProductsFilter.jsx';
import ProductsTable from './_components/ProductsTable.jsx';
import ProductsStore from './ProductsStore';
import ProductsActions from './ProductsActions';

class ProductsView extends Component {

  static getStores() {
    return [ProductsStore];
  }

  static getPropsFromStores() {
    return ProductsStore.getState();
  }

  componentDidMount() {
    ProductsActions.fetchPeopleNames();
    ProductsActions.fetchVendorNames();


  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-lg-12">
          <header className="row">
            <h1>Products</h1>
          </header>
          <div className="row">
            <ProductsFilter/>
          </div>
          <div className="row">
            <ProductsTable/>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(ProductsView);