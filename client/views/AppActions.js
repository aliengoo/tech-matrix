import alt from '../alt';
import axios from 'axios';
import _ from 'lodash';
import AuthApi from '../api/AuthApi';

class AppActions {

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

    AuthApi.setToken();

    axios.post('/api/auth/logout')
      .then(this.actions.loggedOut)
      .catch(response => this.actions.failedLogout(response));
  }

  loggedOut() {
    this.dispatch();
  }

  failedLogout(response) {
    this.dispatch(response.data);
  }
}

export default alt.createActions(AppActions);
