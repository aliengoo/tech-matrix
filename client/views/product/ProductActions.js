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

  fetchPeopleComplete(response) {
    this.dispatch(response.data);
  }

  fetchPeopleFailed(response) {
    this.dispatch(response.data);
  }

  fetchPeople() {
    this.dispatch();

    axios.get('/api/people').then((response) => {
      this.actions.fetchPeopleComplete(response);
    }).catch((response) => {
      this.actions.fetchPeopleFailed(response);
    });
  }

  fetchProductNamesComplete(response) {
    this.dispatch(response.data);
  }

  fetchProductNamesFailed(response) {
    this.dispatch(response.data);
  }

  fetchProductNames() {
    this.dispatch();
    axios.get('/api/product/meta/names').then((response) => {
      this.actions.fetchProductNamesComplete(response);
    }).catch((response) => {
      this.actions.fetchProductNamesFailed(response);
    });
  }

}

export default alt.createActions(ProductActions);
