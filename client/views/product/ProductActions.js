import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import ModelApi from '../../api/ModelApi';

const productApi = new ModelApi("product");
const peopleApi = new ModelApi("people");

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
    this.dispatch(response);
  }

  fetchProduct(id) {
    this.dispatch();

    productApi.get(id)
      .then(this.actions.fetchProductComplete)
      .catch(this.actions.fetchProductFailed);
  }

  fetchPeopleComplete(response) {
    this.dispatch(response.data);
  }

  fetchPeopleFailed(response) {
    this.dispatch(response);
  }

  fetchPeople() {
    this.dispatch();

    peopleApi.getNames()
      .then(this.actions.fetchPeopleComplete)
      .catch(this.actions.fetchPeopleFailed);
  }

  fetchProductNamesComplete(response) {
    this.dispatch(response.data);
  }

  fetchProductNamesFailed(response) {
    this.dispatch(response.data);
  }

  fetchProductNames() {
    this.dispatch();

    productApi.getNames()
      .then(this.actions.fetchProductNamesComplete)
      .catch(this.actions.fetchProductNamesFailed);
  }
}

export default alt.createActions(ProductActions);
