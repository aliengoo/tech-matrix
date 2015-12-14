import alt from '../alt';
import axios from 'axios';
import _ from 'lodash';

import AuthenticationApi from '../common/AuthenticationApi';

class AppActions {

  constructor() {
    this.authenticationApi = new AuthenticationApi();
  }

  fetchStarted() {
    this.dispatch();
  }

  fetchEnded() {
    this.dispatch();
  }

  setError(error) {
    this.dispatch(error);
  }

  clearError() {
    this.dispatch();
  }

  successfulAuthentication(username) {
    this.dispatch(username);
  }

  failedAuthentication(error) {
    this.dispatch(error);
  }

  logoutUser() {
    this.dispatch();

    this.authenticationApi.setToken();

    axios.post('/api/auth/logout')
      .then(this.actions.loggedOut)
      .catch(this.actions.failedLogout);
  }

  loggedOut() {
    this.dispatch();
  }

  failedLogout(result) {
    this.dispatch(result.error);
  }
}

export default alt.createActions(AppActions);
