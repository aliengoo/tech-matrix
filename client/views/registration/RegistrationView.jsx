import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import Form from '../_components/Form.jsx';
import UsernameInput from '../_components/UsernameInput.jsx'
import PasswordInput from '../_components/PasswordInput.jsx'
import RegistrationActions from './RegistrationActions';
import RegistrationStore from './RegistrationStore';
import AppActions from '../AppActions';
import AppStore from '../AppStore';
import ErrorBlock from '../_components/ErrorBlock.jsx';

export default class RegistrationView extends Component {

  constructor(props) {
    super(props);
    this.setField = _.debounce(this.setField, 1000).bind(this);
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
        self.props.history.pushState(null, 'login');
      }
    });
  }

  componentWillUnmount() {
    this.registrationStoreListener();
  }

  setField(field) {
    RegistrationActions.setField(field);

    if (field.username) {
      RegistrationActions.doesUsernameExist(field.username);
    }
  }

  render() {
    const {username, password, fetching, formState, exists} = this.props;
    let conflictErrorBlock = (<ErrorBlock hasError={exists}>Username already in use</ErrorBlock>);

    const disabled = exists || fetching || !_.get(formState, 'valid', false);

    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4">

          <header>
            <h1>Registration</h1>
          </header>

          <Form name="loginForm" onFormStateUpdated={formState => RegistrationActions.setFormState(formState)}>
            <UsernameInput onChange={username => this.setField({username})} defaultValue={username}>
              {conflictErrorBlock}
            </UsernameInput>
            <PasswordInput onChange={password => this.setField({password})} defaultValue={password}/>
            <button
              className="btn btn-primary btn"
              type="button"
              disabled={disabled}
              onClick={() => RegistrationActions.register(username, password)}>Register
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connectToStores(RegistrationView);
