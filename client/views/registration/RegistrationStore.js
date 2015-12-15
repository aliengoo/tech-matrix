import alt from '../../alt';
import AppActions from '../AppActions';
import RegistrationActions from './RegistrationActions';

class RegistrationStore {
  constructor() {
    this.bindActions(RegistrationActions);

    this.state = {
      formState: {
        valid: false
      },
      username: "",
      password: "",
      exists: false,
      success: false
    };
  }

  onSetField(field) {
    var newState = Object.assign({}, field, {exists: false, success: false});
    this.setState(newState);
  }

  onSetFormState(formState) {
    this.setState({
      formState
    });
  }

  onDoesUsernameExist() {
    this.setState({
      exists: false,
      success: false
    });
  }

  onDoesUsernameExistFailed(responseData) {
    // do nothing, errors are handled at the app level
    this.setState({
      exists: false,
      success: false
    });
  }

  onDoesUsernameExistComplete(responseData) {
    this.setState({
      exists: responseData.exists
    });
  }

  onRegister() {
    this.setState({
      success: false
    });
  }

  onRegisterFailed() {
    this.setState({
      success: false
    });
  }

  onRegisterComplete(responseData) {
    this.setState({
      success: responseData.success
    });
  }
}

export default alt.createStore(RegistrationStore);

