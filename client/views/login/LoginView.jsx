import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import Form from '../_components/Form.jsx';
import LoginStore from './LoginStore';
import LoginActions from './LoginActions';
import LoginUsername from './_components/LoginUsername.jsx'
import LoginPassword from './_components/LoginPassword.jsx'

export default class LoginView extends Component {
  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return LoginStore.getState();
  }


  render() {
    const {username, password, fetching, formState} = this.props;

    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4">

          <header>
            <h1>Login</h1>
          </header>

          <Form name="loginForm" onFormStateUpdated={formState => LoginActions.setFormState(formState)}>
            <LoginUsername onChange={username => LoginActions.setField({username})}/>
            <LoginPassword onChange={password => LoginActions.setField({password})}/>
            <button
              className="btn btn-primary btn"
              disabled={fetching || !formState.valid}
              onClick={() => LoginActions.loginUser({username, password})}>Login</button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connectToStores(LoginView);