import axios from 'axios';
import store from 'store';
import Q from 'q';

const TechMatrixToken = "tech-matrix-token";

axios.interceptors.request.use((config) => {
  var token = store.get(TechMatrixToken);

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
}, (error) => {
  return Q.reject(error);
});

