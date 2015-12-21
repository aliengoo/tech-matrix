import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import AppActions from '../AppActions';

import AuthenticationApi from '../../common/AuthenticationApi';
let authenticationApi = new AuthenticationApi();

class LoginActions {

  setElementState(elementState) {
    this.dispatch(elementState);
  }

  reset() {
    this.dispatch();
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
        if (result.status === 401 || result.status === 403) {
          AppActions.failedAuthentication("Invalid username or password");
        } else {
          console.error(result);
          AppActions.failedAuthentication("There was a problem logging you in.  Contact an administrator.");
        }
      });
  }
}

export default alt.createActions(LoginActions);