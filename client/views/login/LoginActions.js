import alt from '../../alt';
import axios from 'axios';
import _ from 'lodash';
import AppActions from '../AppActions';
import AuthApi from '../../api/AuthApi';

class LoginActions {

  setFormState(formState) {
    this.dispatch(formState);
  }

  setField(field) {
    this.dispatch(field);
  }

  loginUser(credentials) {
    this.dispatch();

    AuthApi.setToken();

    axios.post('/api/authenticate', credentials)
      .then((r) => {
        if (r.data.success) {
          AuthApi.setToken(r.data.token);
          AppActions.successfulAuthentication(r.data.username);
        } else {
          AppActions.failedAuthentication(r.data);
        }
      })
      .catch(r => AppActions.failedAuthentication(r.data));
  }



}

export default alt.createActions(LoginActions);