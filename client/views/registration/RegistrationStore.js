import alt from '../../alt';
import AppActions from '../AppActions';
import RegistrationActions from './RegistrationActions';
import ElementState from '../_common/ElementState';
import ElementStateCollection from '../_common/ElementStateCollection';

class RegistrationStore {
  constructor() {
    this.bindActions(RegistrationActions);
    this.elementStateCollection = new ElementStateCollection();

    this.state = {
      username: "",
      password: "",
      states: this.elementStateCollection,
      exists: false,
      success: false
    };
  }

  onSetElementState(elementState) {
    if (!elementState) {
      return;
    }

    this.elementStateCollection.setElementState(elementState);

    let newState = {
      states: this.elementStateCollection,
      [elementState.name]: elementState.value
    };

    this.setState(newState);
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

