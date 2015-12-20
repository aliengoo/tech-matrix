import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import Form from '../_components/Form.jsx';
import FormGroupInput from '../_components/FormGroupInput.jsx'
import AppStore from '../AppStore';
import LoginStore from './LoginStore';
import LoginActions from './LoginActions';
import NotRegisteredYet from './_components/NotRegisteredYet.jsx';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.setField = _.debounce(this.setField, 500).bind(this);
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

  setField(field) {
    LoginActions.setField(field);
  }

  componentDidMount() {
    let self = this;
    self.appStoreListener = AppStore.listen((state) => {
      if (state.isAuthenticated) {
        setTimeout(() => {
          self.props.history.pushState(null, 'products');
        }, 1);
      }
    });
  }

  componentWillUnmount() {
    this.appStoreListener();
  }

  render() {
    const {username, password, fetching, formState, history} = this.props;

    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
          <header>
            <h1>Login</h1>
          </header>
          <Form name="loginForm" onFormStateUpdated={formState => LoginActions.setFormState(formState)}>

            <button
              className="btn btn-primary btn pull-right"
              type="button"
              disabled={fetching || !formState.valid}
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