import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import ValidatedInput from '../_components/ValidatedInput.jsx';
import ElementStatesManager from '../_common/ElementStatesManager';

import TestActions from './TestActions';
import TestStore from './TestStore';

class TestView extends Component {

  constructor(props) {
    super(props);
    this.elementStatesManager = new ElementStatesManager();
    this.elementStateListener = this.elementStateListener.bind(this);
  }

  static getStores() {
    return [TestStore];
  }

  static getPropsFromStores() {
    return TestStore.getState();
  }

  elementStateListener(elementState) {
    TestActions.setField({[elementState.name]: elementState.value});
    TestActions.setElementStates(this.elementStatesManager.setElementState(elementState));
  }

  render() {
    let disabled = !this.elementStatesManager.state.areAllValid;

    return (
      <div className="container">
        <div className="col-lg-12">
          <header>
            <h1>
              Test
            </h1>
          </header>

          <form name="testForm">
            <ValidatedInput
              elementStateListener={this.elementStateListener}
              required={true}
              minLength={3}
              name="Username"
              label="Username"
              type="email"/>

            <ValidatedInput
              elementStateListener={this.elementStateListener}
              minLength={8}
              required={true}
              name="Password"
              label="Password"
              type="password"/>

            <button type="button" className="btn btn-primary" disabled={disabled}>Do something</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToStores(TestView);