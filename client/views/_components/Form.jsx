"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import Rx from 'rx';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.formObservable = {};
    this.formState = {
      valid: true
    };
    this.evaluateValidity = this.evaluateValidity.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  evaluateValidity(element) {

    if (!_.isFunction(element.checkValidity) && !!element.name) {
      return;
    }

    element.checkValidity();

    this.formState[element.name] = element.validity;

    var valid = true;

    for (let key of Object.keys(this.formState)) {
      if (key === "valid") {
        continue;
      }

      if (!this.formState[key].valid) {
        valid = false;
        break;
      }
    }

    this.formState.valid = valid;
    this.props.onFormStateUpdated(this.formState);
  }

  componentDidMount() {
    const {name, debounce} = this.props;

    let form = document.querySelector(`[name="${name}"]`);

    this.formObservable = Rx.Observable.fromEvent(form, 'keyup')
      .debounce(debounce)
      .map(ev => ev.target)
      .subscribe(this.evaluateValidity);
  }

  renderChildren() {
    let self = this;
    return React.Children.map(self.props.children, function (child) {

      if (!child.type.name) {
        return child;
      }

      return React.cloneElement(child, {
        validityState: self.formState[child.type.name]
      });
    });
  }

  componentWillUnmount() {
    this.formObservable.unsubscribe();
  }

  render() {
    const {name} = this.props;

    return (
      <form name={name}>
        {this.renderChildren()}
      </form>
    );
  }
}

Form.defaultProps = {
  debounce: 1000
};

Form.propTypes = {
  debounce: PropTypes.number,
  onFormStateUpdated: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};