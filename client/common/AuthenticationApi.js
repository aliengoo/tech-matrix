import axios from 'axios';
import store from 'store';

const TokenKey = "auth_token";

export default class AuthenticationApi {

  authenticate(username, password) {
    let data = {
      username, password
    };

    return axios.post(`/api/authenticate`, data);
  }

  logout() {
    return axios.post(`/api/auth/authentication/logout`);
  }

  verify() {
    return axios.get(`/api/auth/authentication/verify`);
  }

  getToken() {
    return store.get(TokenKey);
  }

  setToken(value = undefined) {
    store.set(TokenKey, value);
  }
}
