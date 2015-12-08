"use strict";

import React, {Component, PropTypes} from 'react';
import Rx from 'rx';

import Label from '../_components/Label.jsx';

export default class Name extends Component {

  componentDidMount() {
    const {debounce, onChange} = this.props;

    this.observable = Rx.Observable.fromEvent(document.querySelector("#name"), "keyup")
      .debounce(debounce || 500)
      .map(ev => ev.target)
      .filter(element => !!element.name)
      .subscribe(element => onChange(element.name, element.value));
  }

  componentWillUnmount() {
    this.observable.unsubscribe();
  }

  render() {
    const {value} = this.props;

    return (
      <div className="form-group">
        <Label htmlFor="name">Name</Label>
        <input
          type="text"
          className="form-control"
          defaultValue={value}
          id="name"
          name="name"
          required={true}/>
      </div>
    );
  }
}

Name.propTypes = {
  value: PropTypes.string,
  debounce: PropTypes.number,
  onChange: PropTypes.func.isRequired
};