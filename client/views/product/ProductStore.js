import alt from '../../alt';
import AppActions from '../AppActions';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindActions(ProductActions);

    this.state = {
      product: {},
      people: [],
      productNames: [],
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

    this.setState({});
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
    this.setState({});
  }

  onFetchProductNamesComplete(productNames) {
    this.setState({
      error: null,
      productNames
    });
  }

  onFetchProductNamesFailed(error) {
    this.setState({
      error
    });
  }
}

export default alt.createStore(ProductStore);
