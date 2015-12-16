import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import AppActions from '../AppActions';

import AuthenticationApi from '../../common/AuthenticationApi';
let authenticationApi = new AuthenticationApi();

class LoginActions {

  setFormState(formState) {
    this.dispatch(formState);
  }

  setField(field) {
    this.dispatch(field);
  }

  login(username, password) {
    this.dispatch();

    // clear the current token
    authenticationApi.setToken();

    // notify at application level we are fetching
    AppActions.fetchStarted();

    authenticationApi.authenticate(username, password)
      .then((result) => {

        if (result.success) {
          // set the token in localStorage
          authenticationApi.setToken(result.token);

          // assign the username to the AppStore
          AppActions.successfulAuthentication(result.username);
        } else {
          AppActions.failedAuthentication(result.error);
        }

      }).catch((result) => {
        AppActions.failedAuthentication(result.error);
      });
  }
}

export default alt.createActions(LoginActions);