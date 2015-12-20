import _ from 'lodash';

// for use in container, each element should report to the state manager
export default class ElementStateCollection {
  constructor() {
    this._elementStates = {areAllValid: false};
    this._areAllValid = this._areAllValid.bind(this);
  }


  setElementState(elementState) {
    this._elementStates = Object.assign({}, this._elementStates, {[elementState.name]: elementState});
    this._elementStates.areAllValid = this._areAllValid();
    return this._elementStates;
  }

  get state() {
    return this._elementStates;
  }

  getValue(name) {
    for(let elementState of this._elementStates) {
      if (name === elementState.name) {
        return elementState.value;
      }
    }
  }

  _areAllValid() {
    let valid = true;

    for (let key of Object.keys(this._elementStates)) {
      if (key === "areAllValid") {
        continue;
      }

      if (!this._elementStates[key].valid) {
        valid = false;
        break;
      }
    }

    return valid;
  }
}