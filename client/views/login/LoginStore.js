import alt from '../../alt';
import AppActions from '../AppActions';
import LoginActions from './LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);

    this.state = {
      formState: {
        valid: false
      },
      username: "",
      password: ""
    };
  }

  onSetFormState(formState) {
    this.setState({
      formState
    });
  }

  onSetField(field) {
    this.setState(field);
  }

  onLoginUserFailed(error) {
    AppActions.fetchEnded();

    this.setState({
      username: "",
      error
    });
  }

  onLoginUserComplete(response) {
    this.setState({
      username: response.username,
      fetching: false
    });
  }

  onLoginUser() {
    this.setState({
      fetching: true
    });
  }

  onLogoutUserFailed(error) {
    this.setState({
      fetching: false,
      error
    });
  }

  onLogoutUserComplete(response) {
    this.setState({
      username: null,
      fetching: false
    });
  }

  onLogoutUser() {
    this.setState({
      fetching: true
    });
  }
}

export default alt.createStore(LoginStore);
