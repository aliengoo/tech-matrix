"use strict";

import Q from 'q';
import axios from 'axios';

const BaseUrl = "/api/registration";

export default class RegistrationApi {
  constructor() {

  }

  isUsernameTaken() {

  }

  register(username, password) {


     axios.post(`${BaseUrl}/register`, {username, password})
       .then();
  }
}