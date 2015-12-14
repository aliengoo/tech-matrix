import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import ProductApi from './ProductApi';

class ProductActions {

  constructor() {
    this.productApi = new ProductApi();
  }

  formStateUpdated(formState) {
    this.dispatch(formState);
  }

  setField(field) {
    this.dispatch(field);
  }

  get(id) {
    this.dispatch();
    this.productApi.get(id)
      .then(this.actions.getComplete)
      .catch(this.actions.getFailed);
  }

  getComplete(product) {
    this.dispatch(product);
  }

  getFailed(responseData) {
    this.dispatch(responseData);
  }
}

export default alt.createActions(ProductActions);
