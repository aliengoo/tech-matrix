import _ from 'lodash';

import connectToStores from 'alt/utils/connectToStores';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, {Component, PropTypes} from 'react';
import Form from '../_components/Form.jsx';
import ValidatedInput from '../_components/ValidatedInput.jsx';
import UsernameInput from '../_components/UsernameInput.jsx'
import PasswordInput from '../_components/PasswordInput.jsx'
import RegistrationActions from './RegistrationActions';
import RegistrationStore from './RegistrationStore';
import AppActions from '../AppActions';
import AppStore from '../AppStore';
import Errors from '../_components/Errors.jsx';
import ErrorPanel from '../_components/ErrorPanel.jsx';

export default class RegistrationView extends Component {

  constructor(props) {
    super(props);
    this.elementStateListener = this.elementStateListener.bind(this);
  }

  static getStores() {
    return [AppStore, RegistrationStore];
  }

  static getPropsFromStores() {
    return Object.assign(
      {},
      AppStore.getState(),
      RegistrationStore.getState());
  }

  componentDidMount() {
    var self = this;
    self.registrationStoreListener = RegistrationStore.listen((state) => {
      var isSuccessful = _.get(state, 'success', false);

      if (isSuccessful) {
        // prevents dispatcher invocation in another dispatch
        setTimeout(() => {
          self.props.history.pushState(null, 'login');
        }, 1);
      }
    });
  }

  componentWillUnmount() {
    this.registrationStoreListener();
  }


  elementStateListener(elementState) {
    RegistrationActions.setElementState(elementState);

    if (elementState.name === "username" && elementState.valid) {
      RegistrationActions.doesUsernameExist(elementState.value);
    }
  }

  render() {
    const {username, password, fetching, exists, states, error} = this.props;

    const disabled = exists || fetching || !states.areAllValid;

    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">

          <header>
            <h1>Registration</h1>
          </header>

          <Form name="loginForm">

            <ValidatedInput
              elementStateListener={this.elementStateListener}
              defaultValue={username}
              required={true}
              minLength={3}
              customValidityState={{
                exists
              }}
              errorMessagesMap={{
                exists: "Username already in use"
              }}
              name="username"
              label="Username"
              placeholder="e.g. fred@blogs.net"
              type="email"/>

            <ValidatedInput
              elementStateListener={this.elementStateListener}
              pattern={"^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!#$%&? \"]).*$"}
              defaultValue={username}
              required={true}
              minLength={3}
              errorMessagesMap={{
                patternMismatch: "Password does not meet the minimum requirement"
              }}
              name="password"
              label="Password"
              placeholder="e.g. fred@blogs.net"
              type="password"/>

            <button
              className="btn btn-primary pull-right"
              type="button"
              disabled={disabled}
              onClick={() => RegistrationActions.register(username, password)}>Register
            </button>
            <div className="clearfix"></div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connectToStores(RegistrationView);
