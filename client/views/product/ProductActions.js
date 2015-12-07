import alt from '../../alt';
import axios from 'axios';

class ProductActions {

  fetchProductComplete(product) {
    this.dispatch({
      product
    });
  }

  fetchProductFailed(error) {
    this.dispatch({
      error
    });
  }

  fetchProduct(id) {

    this.dispatch();

    axios.get(`/api/product/${id}`).then((product) => {
      this.actions.fetchProductComplete(product);
    }).catch((error) => {
      this.actions.fetchProductFailed(error);
    });

  }
}

export default alt.createActions(ProductActions);
