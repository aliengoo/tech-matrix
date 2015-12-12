import axios from 'axios';
import store from 'store';
import Q from 'q';
import AuthApi from '../AuthApi';

axios.interceptors.request.use((config) => {
  var token = AuthApi.getToken();

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
}, (error) => {
  return Q.reject(error);
});

