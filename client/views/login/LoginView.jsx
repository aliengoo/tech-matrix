import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import Form from '../_components/Form.jsx';
import AppStore from '../AppStore';
import LoginStore from './LoginStore';
import LoginActions from './LoginActions';
import LoginUsername from './_components/LoginUsername.jsx'
import LoginPassword from './_components/LoginPassword.jsx'

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.setField = _.debounce(this.setField).bind(this);
  }
  static getStores() {
    return [AppStore, LoginStore];
  }

  static getPropsFromStores() {
    var props = Object.assign(
      {},
      AppStore.getState(),
      LoginStore.getState());
  }

  setField(field) {
    LoginActions.setField(field);
  }

  componentDidMount() {
    this.appStoreListener = AppStore.listen((data) => {
      console.log("listener:", data);
    });
  }

  componentWillUnmount() {
    this.appStoreListener();
  }

  render() {
    const {username, password, fetching, formState, history} = this.props;
    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4">

          <header>
            <h1>Login</h1>
          </header>

          <Form name="loginForm" onFormStateUpdated={formState => LoginActions.setFormState(formState)}>
            <LoginUsername onChange={username => this.setField({username})} defaultValue={username}/>
            <LoginPassword onChange={password => this.setField({password})} defaultValue={password}/>
            <button
              className="btn btn-primary btn"
              type="button"
              disabled={fetching || !formState.valid}
              onClick={() => LoginActions.login({username, password})}>Login</button>
            <button
              className="btn btn-success btn"
              type="button"
              onClick={() => history.pushState(null, '/test')}>Test location</button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connectToStores(LoginView);