import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';

export default class ProductsApi {
  runFilter(page, filter) {
    return axios.post('/api/auth/products', {page, filter});
  }
}