"use strict";

import Q from 'q';
import axios from 'axios';

const BaseUrl = "/api/registration";

export default class RegistrationApi {

  isUsernameTaken(username) {
    return axios.get(`${BaseUrl}`, {
      params: {username}
    });
  }

  register(username, password) {
     return axios.post(`${BaseUrl}/register`, {username, password});
  }
}