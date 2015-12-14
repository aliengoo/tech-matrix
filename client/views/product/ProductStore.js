import alt from '../../alt';
import AppActions from '../AppActions';
import ProductActions from './ProductActions';

class ProductStore {
  constructor() {
    this.bindActions(ProductActions);

    this.state = {
      product: {},
      formState: null
    };
  }

  onFormStateUpdated(formState) {
    this.setState({formState});
  }

  onSetField(field) {
    var product = Object.assign({}, this.state.product, field);
    this.setState({product});
  }

  onGet() {
    AppActions.fetchStarted();
    this.setState({});
  }

  onGetComplete(product) {
    this.setState({
      product
    });
  }

  onGetFailed(error) {
    this.setState({
      error,
      product: null
    });
  }
}

export default alt.createStore(ProductStore);
