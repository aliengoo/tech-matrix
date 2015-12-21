import alt from '../../alt';
import AppActions from '../AppActions';
import LoginActions from './LoginActions';
import FormGroupInput from '../_components/FormGroupInput.jsx';
import ElementStateCollection from '../_common/ElementStateCollection';

const DefaultState = {
  username: "",
  password: ""
};

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.elementStateCollection = new ElementStateCollection();
    this.state = Object.assign({}, DefaultState, { states: this.elementStateCollection});
  }

  onReset() {
    this.elementStateCollection = new ElementStateCollection();
    this.setState(Object.assign({}, DefaultState, { states: this.elementStateCollection}));
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

  onLogin() {
    this.setState();
  }
}

export default alt.createStore(LoginStore);
