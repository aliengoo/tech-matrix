import _ from 'lodash';


// for use in container, each element should report to the state manager
export default class ElementState {
  constructor() {
    this._elementState = {};
    this.evaluate = this.evaluate.bind(this);
  }

  evaluate(element) {
    if (!element || !element.checkValidity) {
      return;
    }

    if (!element.name) {
      throw "ElementStateCollection.setElement: element.name is required"
    }

    element.checkValidity();

    const priorElementState = this._elementState;

    let currentElementState = {};
    let valueHistory = [];

    if (priorElementState && priorElementState.valueHistory) {
      valueHistory = [...priorElementState.valueHistory.slice(), element.value];

      if (valueHistory.length > 1) {
        valueHistory.unshift();
      }
    } else {
      valueHistory[0] = element.value;
    }

    currentElementState.element = element;
    currentElementState.name = element.name;
    currentElementState.valueHistory = valueHistory;
    currentElementState.value = element.value;
    currentElementState.validity = element.validity;
    currentElementState.valid = element.validity.valid;
    currentElementState.dirty = valueHistory.length > 1;


    this._elementState = currentElementState;

    return this._elementState;
  }

  get state() {
    return this._elementState;
  }

  dispose() {
    delete this._elementState;
  }
}