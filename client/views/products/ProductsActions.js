import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import ModelApi from '../../api/ModelApi';

const productApi = new ModelApi("product");
const peopleApi = new ModelApi("people");
const vendorApi = new ModelApi("vendor");

class ProductsActions {

  fetchPeopleNamesComplete(response) {
    this.dispatch(response.data);
  }

  fetchPeopleNamesFailed(response){
    this.dispatch(response.data);
  }

  fetchPeopleNames() {
    this.dispatch();
    peopleApi.getNames()
      .then(this.actions.fetchPeopleNamesComplete)
      .catch(this.action.fetchPeopleNamesFailed);
  }

  fetchVendorNamesComplete(response) {
    this.dispatch(response.data);
  }

  fetchVendorNamesFailed(response) {
    this.dispatch(response.data);
  }

  fetchVendorNames() {
    this.dispatch();

    vendorApi.getNames()
      .then(this.actions.fetchVendorNamesComplete)
      .catch(this.actions.fetchVendorNamesFailed);
  }

  filterProductsComplete(response) {
    this.dispatch(response.data);
  }

  filterProductsFailed(response) {
    this.dispatch(response.data);
  }

  filterProducts(page, query) {
    this.dispatch();

    productApi.pagedQuery(page, query)
      .then(this.actions.filterProductsComplete)
      .catch(this.actions.filterProductsFailed);
  }
}

export default alt.createActions(ProductsActions);

