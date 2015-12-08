import alt from '../../alt';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindListeners({
      onValidateProductForm: ProductActions.validateProductForm,
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

  onValidateProductForm(element) {
    const formState = Object.assign({}, this.state.formState, {
      [element.name]:  element.validity
    });

    const newState = Object.assign({}, this.state, {formState});

    console.log(newState);

    this.setState(newState);
  }

  onSetProductField(field) {
    var product = Object.assign({}, this.state.product, {[field.prop]: field.value});
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
