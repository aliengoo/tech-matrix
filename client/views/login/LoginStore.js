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

  onLoginUser() {
    this.setState({
      username: "",
      password: ""
    });
  }
}

export default alt.createStore(LoginStore);
