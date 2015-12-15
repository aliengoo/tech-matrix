import axios from 'axios';
import store from 'store';
import Q from 'q';
import _ from 'lodash';
import AuthenticationApi from './AuthenticationApi';

var authenticationApi = new AuthenticationApi();

axios.interceptors.request.use(config => {
  var token = authenticationApi.getToken();

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
}, error => Q.reject(error));


// all responses from the API must either be data, or it's broken
axios.interceptors.response.use(response => response.data, response => {
    var error = _.get(response, "data.error", {
      message: "API data was empty"
    });

    console.error(`!API: ${response.status} - ${response.statusText}:`, error);

    return response;
  });

