import axios from 'axios';

const BaseUrl = '/api/auth/product';

export default class ProductApi {
  get(id) {
    return axios.get(`${BaseUrl}/${id}`);
  }

  update(product) {
    return axios.put(`${BaseUrl}/${product.id}`, product);
  }

  insert(product) {
    return axios.post(`${BaseUrl}`, product);
  }

  destroy(id) {
    return axios.delete(`${BaseUrl}/${id}`);
  }
}
