import alt from '../../alt';
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

  onFetchPeopleNames() {
    this.setState({
      fetching: true
    });
  }

  onFetchPeopleNamesComplete(peopleNames) {
    this.setState({
      peopleNames,
      fetching: false
    });
  }

  onFetchPeopleNamesFailed(error) {
    this.setState({
      error,
      peopleNames: [],
      fetching: false
    });
  }

  onFetchVendorNames() {
    this.setState({
      fetching: true
    });
  }

  onFetchVendorNamesComplete(vendorNames) {
    this.setState({
      vendorNames,
      fetching: false
    });
  }

  onFetchVendorNamesFailed(error) {
    this.setState({
      error,
      vendorNames: []
    });
  }

  onFilterProducts() {
    this.setState({
      fetching: true
    });
  }

  onFilterProductsComplete(results) {
    this.setState({
      fetching: false,
      products: results
    });
  }

  onFilterProductsFailed(error) {
    this.setState({
      fetching: false,
      error
    });
  }
}

export default alt.createStore(ProductsStore);
