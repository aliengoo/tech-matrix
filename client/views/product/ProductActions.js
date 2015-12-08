import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';

class ProductActions {

  formStateUpdated(formState) {
    this.dispatch(formState);
  }

  setProductField(field) {
    this.dispatch(field);
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
