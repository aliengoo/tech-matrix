import alt from '../../alt';
import LoginActions from './LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);

    this.state = {
      formState: {
        valid: false
      },
      username: "",
      password: "",
      fetching: false,
      error: null
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
    this.setState({
      username: "",
      fetching: false,
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

export default alt.createStore(LoginActions);
