import alt from '../../alt';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindListeners({
      onFormStateUpdated: ProductActions.formStateUpdated,
      onSetProductField: ProductActions.setProductField,
      onFetchProduct: ProductActions.fetchProduct,
      onFetchProductComplete: ProductActions.fetchProductComplete,
      onFetchProductFailed: ProductActions.fetchProductFailed,
      onFetchPeople: ProductActions.fetchPeople,
      onFetchPeopleComplete: ProductActions.fetchPeopleComplete,
      onFetchPeopleFailed: ProductActions.fetchPeopleFailed,
      onFetchProductNames: ProductActions.fetchProductNames,
      onFetchProductNamesComplete: ProductActions.fetchProductNamesComplete,
      onFetchProductNamesFailed: ProductActions.fetchProductNamesFailed
    });

    this.state = {
      product: {},
      people: [],
      productNames: [],
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
    var product = Object.assign({}, this.state.product, field);
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

  onFetchPeople() {
    this.setState({
      fetching: true,
      error: null,
      people: []
    });
  }

  onFetchPeopleComplete(people) {
    this.setState({
      fetching: false,
      error: null,
      people
    });
  }

  onFetchPeopleFailed(error) {
    this.setState({
      fetching: false,
      error,
      people: []
    });
  }
  onFetchProductNames() {
    var newState = Object.assign({}, this.state, {
      fetching: true,
      error: null
    });

    this.setState(newState);
  }

  onFetchProductNamesComplete(productNames) {
    var newState = Object.assign({}, this.state, {
      fetching: false,
      error: null,
      productNames
    });

    this.setState(newState);
  }

  onFetchProductNamesFailed(error) {
    var newState = Object.assign({}, this.state, {
      fetching: false,
      error
    });

    this.setState(newState);
  }
}

export default alt.createStore(ProductStore);
