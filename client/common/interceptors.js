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

// all responses from the API must either be data, or
axios.interceptors.response
  .use(response => response.data)
  .catch(response => response.data);

