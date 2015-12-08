import alt from '../../alt';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindListeners({
      onFormStateUpdated: ProductActions.formStateUpdated,
      onSetProductField: ProductActions.setProductField,
      onFetchProduct: ProductActions.fetchProduct,
      onFetchProductComplete: ProductActions.fetchProductComplete,
      onFetchProductFailed: ProductActions.fetchProductFailed
    });

    this.state = {
      product: null,
      error: null,
      fetching: false,
      formState: null
    };
  }

  onFormStateUpdated(formState) {
    const newState = Object.assign({}, this.state, {formState});
    this.setState(newState);
  }

  onSetProductField(field) {
    var product = Object.assign({}, this.state.product, {[field.name]: field.value});
    var newState = Object.assign({}, this.state, {product});
    this.setState(newState);
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
