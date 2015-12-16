import alt from '../../alt';
import AppActions from '../AppActions';
import ProductsActions from './ProductsActions';

class ProductsStore {
  constructor() {
    this.bindActions(ProductsActions);

    this.state = {
      products: [],
      page: {
        current: 1,
        totalPages: 1,
        totalItems: 0,
        skip: 0,
        limit: 10
      },
      peopleNames: [],
      vendorNames: [],
      error: null,
      fetching: false,
      filter: ""
    };
  }


}

export default alt.createStore(ProductsStore);
