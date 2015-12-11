import alt from '../../alt';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindActions(ProductActions);

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
    this.setState({formState});
  }

  onSetProductField(field) {
    var product = Object.assign({}, this.state.product, field);
    this.setState({product});
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
    this.setState({
      fetching: true,
      error: null
    });
  }

  onFetchProductNamesComplete(productNames) {
    this.setState({
      fetching: false,
      error: null,
      productNames
    });
  }

  onFetchProductNamesFailed(error) {
    this.setState({
      fetching: false,
      error
    });
  }
}

export default alt.createStore(ProductStore);
