import alt from '../../alt';

class TestActions {

  setElementStates(elementStates) {
    this.dispatch(elementStates);
  }

  setField(field) {
    this.dispatch(field);
  }
}

export default alt.createActions(TestActions);