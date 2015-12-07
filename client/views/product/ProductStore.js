import alt from '../../alt';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindListeners({
      onFetchProduct: ProductActions.fetchProduct,
      onFetchProductComplete: ProductActions.fetchProductComplete,
      onFetchProductFailed: ProductActions.fetchProductFailed
    });

    this.state = {
      product: null,
      error: null,
      fetching: false
    };
  }

  onFetchProduct() {
    this.setState({
      fetching: true
    });
  }

  onFetchProductComplete(product) {
    this.setState({
      fetching: false,
      error: null,
      product
    });
  }

  onFetchProductFailed(error) {
    this.setState({
      fetching: false,
      error,
      product: null
    });
  }
}

export default alt.createStore(ProductStore);
