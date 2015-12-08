import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';

class ProductActions {

  validateProductForm(changedElement) {
    changedElement.checkValidity();
    this.dispatch(changedElement);
  }

  setProductField(prop, value) {
    this.dispatch({prop, value});
  }

  fetchProductComplete(response) {
    this.dispatch(response.data);
  }

  fetchProductFailed(response) {
    this.dispatch(response.data);
  }

  fetchProduct(id) {

    this.dispatch();

    axios.get(`/api/product/${id}`).then((response) => {
      this.actions.fetchProductComplete(response);
    }).catch((response) => {
      this.actions.fetchProductFailed(response);
    });

  }
}

export default alt.createActions(ProductActions);
