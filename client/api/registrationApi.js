"use strict";

import Q from 'q';
import axios from 'axios';

function register(username, password) {
  let defer = Q.defer();

  axios.post('/api/registration/register', {
    username, password
  }).then(r => r.data.success ? defer.resolve(r.data) : defer.reject(r.data)).catch(response => defer.reject(response.));

  return defer.promise;
}

function usernameAvailable(username) {

}