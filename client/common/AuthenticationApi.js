import axios from 'axios';
import store from 'store';

const BaseUrl = "/api/authentication";
const TokenKey = "auth_token";

export default class AuthenticationApi {

  authenticate(username, password) {
    return axios.post(`${BaseUrl}/authenticate`, {
      username, password
    });
  }

  logout() {
    return axios.post(`${BaseUrl}/auth/logout`);
  }

  verify() {
    return axios.get(`${BaseUrl}/auth/verify`);
  }

  getToken() {
    return store.get(TokenKey);
  }

  setToken(value = undefined) {
    store.set(TokenKey, value);
  }
}
