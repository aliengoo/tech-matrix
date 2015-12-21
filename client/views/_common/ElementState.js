import _ from 'lodash';
import Q from 'q';

/**
 * Evaluates the state of a given element using HTML5 check validity
 *
 * Tries to do something akin to Angular Form validation, but without the form.
 *
 * See ElementStateCollection for grouping ElementStates
 */
export default class ElementState {
  constructor(options) {
    this._elementState = {};
    this.evaluate = this.evaluate.bind(this);
    this._evaluate = this._evaluate.bind(this);
    this._getValidity = this._getValidity.bind(this);

    this._validators = _.get(options, "validators", undefined);
    this._asyncValidators = _.get(options, "asyncValidators", undefined);
  }

  evaluate(element) {
    let defer = Q.defer();

    if (!element || !element.checkValidity) {
      defer.resolve();
    }

    if (!element.name) {
      throw "ElementStateCollection.setElement: element.name is required"
    }

    // custom validators
    let customValidatorResult = {};

    if (this._validators) {
      for(let key in this._validators) {
        let validator = this._validators[key];
        if (_.isFunction(validator)) {
          customValidatorResult[key] = validator(element);
        }
      }
    }

    if (this._asyncValidators) {
      let asyncValidatorPromises = [];
      let keys = [];

      for(let key in this._asyncValidators) {
        let asyncValidator = this._asyncValidators[key];

        if (_.isFunction(asyncValidator)) {
          keys.push(key);
          asyncValidatorPromises.push(asyncValidator(element));
        }
      }

      if (asyncValidatorPromises.length > 0) {
        Q.all(asyncValidatorPromises).then((results) => {
          for(let i = 0; i < results.length; i++) {
            customValidatorResult[keys[i]] = results[i];
          }
          defer.resolve(this._evaluate(element, customValidatorResult))
        }).catch(error => { throw error; });
      } else {
        defer.resolve(this._evaluate(element));
      }
    } else {
      defer.resolve(this._evaluate(element));
    }

    return defer.promise;
  }

  _evaluate(element, customValidatorResult  = undefined) {
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
    currentElementState.validity = this._getValidity(element, customValidatorResult);
    currentElementState.valid = element.validity.valid;
    currentElementState.dirty = valueHistory.length > 1;

    this._elementState = currentElementState;

    return this._elementState;
  }

  /**
   * Yeah, so, ValidityState doesn't appear to be enumerable...
   * @param element
   * @param customValidatorResult
   * @returns {*}
   * @private
   */
  _getValidity(element, customValidatorResult = {}) {
    let validity = {};
    for(let key in element.validity) {
      validity[key] = element.validity[key];
    }
    return Object.assign({}, validity, customValidatorResult);
  }

  get state() {
    return this._elementState;
  }

  dispose() {
    delete this._elementState;
  }
}