"use strict";
import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import RegistrationApi from './RegistrationApi';
import AppActions from '../AppActions';

let registrationApi = new RegistrationApi();

class RegistrationActions {

  setField(field) {
    this.dispatch(field);
  }

  setFormState(formState) {
    this.dispatch(formState);
  }

  doesUsernameExist(username) {
    AppActions.fetchStarted();
    this.dispatch();

    return registrationApi.doesUsernameExist(username).then(
      this.actions.doesUsernameExistComplete,
      this.actions.doesUsernameExistFailed);
  }

  doesUsernameExistFailed(responseData) {
    AppActions.fetchEnded();
    AppActions.setError(responseData);
    this.dispatch(responseData);
  }

  doesUsernameExistComplete(responseData) {
    AppActions.fetchEnded();
    this.dispatch(responseData);
  }

  register(username, password) {
    AppActions.fetchStarted();
    this.dispatch();

    registrationApi.register(username, password).then(
      this.actions.registerComplete,
      this.actions.registerFailed);
  }

  registerFailed(responseData) {
    AppActions.fetchEnded();
    AppActions.setError(responseData);
    this.dispatch(responseData);
  }

  registerComplete(responseData) {
    AppActions.fetchEnded();
    this.dispatch(responseData);
  }
}

export default alt.createActions(RegistrationActions);