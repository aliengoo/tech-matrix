import connectToStores from 'alt/utils/connectToStores';
import React, {Component} from 'react';
import ProductsFilter from './_components/ProductsFilter.jsx';
import ProductsTable from './_components/ProductsTable.jsx';
import AppStore from '../AppStore';
import ProductsStore from './ProductsStore';
import ProductsActions from './ProductsActions';

class ProductsView extends Component {

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  static getStores() {
    return [AppStore, ProductsStore];
  }

  static getPropsFromStores() {
    return Object.assign({}, AppStore.getState(), ProductsStore.getState());
  }

  componentDidMount() {
  }

  onSearch(filter) {

  }

  render() {
    const {fetching, products} = this.props;

    return (
      <div className="container-fluid">

        <div className="row">
          <header className="col-lg-3">
            <h1>Products</h1>
          </header>
        </div>

        <div className="row">
          <div className="col-lg-2">
            <ProductsFilter onSearch={this.onSearch} fetching={fetching}/>
          </div>

          <div className="col-lg-10">
            <ProductsTable fetching={fetching} products={products}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(ProductsView);