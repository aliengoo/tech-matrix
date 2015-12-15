import axios from 'axios';
import store from 'store';
import Q from 'q';
import AuthenticationApi from './AuthenticationApi';

let authenticationApi = new AuthenticationApi();

axios.interceptors.request.use((config) => {
  var token = authenticationApi.getToken();

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
}, (error) => {
  return Q.reject(error);
});

// all responses from the API must either be data, or
axios.interceptors.response
  .use(response => {
    return response.data;
  }, response => {
    console.error(`!API-> ${response.status} - ${response.statusText}:`, response.data);
    return response.data;
  });

