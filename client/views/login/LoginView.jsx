import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import Form from '../_components/Form.jsx';
import FormGroupInput from '../_components/FormGroupInput.jsx'
import AppActions from '../AppActions';
import AppStore from '../AppStore';
import LoginStore from './LoginStore';
import LoginActions from './LoginActions';
import NotRegisteredYet from './_components/NotRegisteredYet.jsx';
import ErrorPanel from '../_components/ErrorPanel.jsx';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.elementStateChanged = this.elementStateChanged.bind(this);
  }

  static getStores() {
    return [AppStore, LoginStore];
  }

  static getPropsFromStores() {
    return Object.assign(
      {},
      AppStore.getState(),
      LoginStore.getState());
  }

  componentDidMount() {
    LoginActions.reset();
    AppActions.reset();
    let self = this;
    self.appStoreListener = AppStore.listen((state) => {
      if (state.isAuthenticated) {
        setTimeout(() => {
          // componentWillUnmount doesn't work, so wait for store update, then reset
          LoginActions.reset();
          // clear the current state before moving on
          console.info("Authenticated - transitioning");
          self.props.history.pushState(null, 'auth/products');
        }, 1);
      }
    });
  }

  elementStateChanged(elementState) {
    if (!elementState) {
      return;
    }

    LoginActions.setElementState(elementState);
  }

  componentWillUnmount() {
    this.appStoreListener();
  }

  render() {
    const {username, password, fetching, states, error} = this.props;

    const disabled = fetching || !states.state.areAllValid;

    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
          <header>
            <h1>Login</h1>
          </header>
          <Form name="loginForm">
            <FormGroupInput
              elementStateChanged={this.elementStateChanged}
              defaultValue={username}
              required={true}
              minLength={3}
              ref="username"
              name="username"
              label="Username"
              placeholder="e.g. fred@blogs.net"
              type="email"/>

            <FormGroupInput
              elementStateChanged={this.elementStateChanged}
              defaultValue={password}
              ref="password"
              required={true}
              minLength={8}
              name="password"
              label="Password"
              type="password"/>
            <ErrorPanel error={error} hash={username + password}/>
            <button
              className="btn btn-primary btn pull-right"
              type="button"
              disabled={disabled}
              onClick={() => LoginActions.login(username, password)}>Login
            </button>
            <div className="clearfix"></div>
          </Form>
          <NotRegisteredYet/>
        </div>
      </div>
    );
  }
}

export default connectToStores(LoginView);