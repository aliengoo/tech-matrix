import alt from '../../alt';
import AppActions from '../AppActions';
import store from 'store';

import ProductsApi from './ProductsApi';

let productsApi = new ProductsApi();

class ProductsActions {

  runFilter(page, filter) {
    AppActions.fetchStarted();

    this.dispatch();

    productsApi.runFilter(page, filter).then((results) => {
    }).catch((error) => {

    });
  }
}

export default alt.createActions(ProductsActions);

