import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import token from '../../api/token';

class LoginActions {

  setFormState(formState){
    this.dispatch(formState);
  }

  setField(field) {
    this.dispatch(field);
  }

  loginUserFailed(response) {
    this.dispatch(response.data);
  }

  loginUserComplete(response) {
    var data = response.data;

    // store
    if (data.success) {
      token.set(data.token);
    } else {
      token.set();
    }

    this.dispatch(response.data);
  }

  loginUser(credentials) {
    this.dispatch();

    token.set();

    axios.post('/api/user/login', credentials)
      .then(this.actions.loginUserComplete)
      .catch(this.actions.loginUserFailed);
  }

  logoutUserFailed(response) {
    this.dispatch(response.data);
  }

  logoutUserComplete(response) {
    this.dispatch(response.data);
  }

  logoutUser() {
    this.dispatch();

    token.set();

    axios.post('/api/user/logout')
      .then(this.actions.logoutUserComplete)
      .catch(this.actions.logoutUserFailed);
  }
}

export default alt.createActions(LoginActions);