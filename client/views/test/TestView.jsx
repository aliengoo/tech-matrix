import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import ElementStateCollection from '../_common/ElementStateCollection';

import TestActions from './TestActions';
import TestStore from './TestStore';

class TestView extends Component {

  constructor(props) {
    super(props);
    this.ElementStateCollection = new ElementStateCollection();
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
    TestActions.setElementStates(this.ElementStateCollection.setElementState(elementState));
  }

  render() {
    let disabled = !this.ElementStateCollection.state.areAllValid;

    return (
      <div className="container">
        <div className="col-lg-12">
          <header>
            <h1>
              Test
            </h1>
          </header>

          <form name="testForm">


            <button type="button" className="btn btn-primary" disabled={disabled}>Do something</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connectToStores(TestView);