import alt from '../../alt';

import TestActions from './TestActions';

class TestStore {
  constructor() {
    this.bindActions(TestActions);

    this.state = {
      elementStates: null,
      Username: "",
      Password: ""
    };
  }

  onSetElementStates(elementStates) {
    this.setState({
      elementStates
    });
  }

  onSetField(field) {
    this.setState(field);
    // ensure the view never finds out
    this.preventDefault();
  }
}

export default alt.createStore(TestStore);