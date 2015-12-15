"use strict";

import Q from 'q';
import axios from 'axios';

const BaseUrl = "/api/registration";

export default class RegistrationApi {

  doesUsernameExist(username) {
    return axios.get(`${BaseUrl}/does-username-exist`, {
      params: {username}
    });
  }

  register(username, password) {
     return axios.post(`${BaseUrl}/register`, {username, password});
  }
}