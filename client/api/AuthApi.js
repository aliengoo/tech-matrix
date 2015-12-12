import store from 'store';
import axios from 'axios';
import Q from 'q';

const TokenName = "tech-matrix/auth-token";

class AuthApi {
  constructor() {

  }

  verify() {
    var defer = Q.defer();
    axios.get('/api/auth/verify').then((response) => {
      defer.resolve(response.data);
    }).catch((response) => {
      AuthApi.clearToken();
      defer.reject(response.data);
    });

    return defer.promise;
  }

  static getToken() {
    return store.get(TokenName);
  }

  static clearToken() {
    store.clear();
  }

  static setToken(token = undefined) {
    store.set(TokenName, token);
  }
}