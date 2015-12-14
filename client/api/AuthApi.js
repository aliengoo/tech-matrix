import store from 'store';
import axios from 'axios';
import Q from 'q';

const TokenName = "tech-matrix/auth-token";

function verify() {
  var defer = Q.defer();
  axios.get('/api/auth/verify').then((response) => {
    defer.resolve(response.data);
  }).catch((response) => {
    clearToken();
    defer.reject(response.data);
  });
  return defer.promise;
}


function getToken() {
  return store.get(TokenName);
}

function clearToken () {
  store.clear();
}

function setToken(token = undefined) {
  store.set(TokenName, token);
}

export default {
  verify,
  getToken,
  clearToken,
  setToken
};