import _ from 'lodash';

import connectToStores from 'alt/utils/connectToStores';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
        self.props.history.push(null, 'login');
      }
    });
  }

  componentWillUnmount() {
    this.registrationStoreListener();
  }

  setField(field) {
    const {formState} = this.props;
    RegistrationActions.setField(field);

    console.log(formState);

    let hasValidUsername = !_.get(formState, "UsernameInput.typeMismatch", false);

    if (field.username && hasValidUsername) {
      RegistrationActions.doesUsernameExist(field.username);
    }
  }

  render() {
    const {username, password, fetching, formState, exists} = this.props;

    const disabled = exists || fetching || !_.get(formState, 'valid', false);

    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">

          <header>
            <h1>Registration</h1>
          </header>

          <Form name="loginForm" onFormStateUpdated={formState => RegistrationActions.setFormState(formState)}>
            <UsernameInput
              onChange={username => this.setField({username})}
              defaultValue={username}
              placeholder={"e.g. fred@google.com"}
              label={"Email"}
              type={"email"}>
              {this.renderConflictErrorBlock()}
              {this.renderInvalidEmailErrorBlock()}
            </UsernameInput>
            <PasswordInput onChange={password => this.setField({password})} defaultValue={password}/>
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

  renderInvalidEmailErrorBlock() {
    const typeMismatch = _.get(this.props.formState, 'UsernameInput.typeMismatch', false);
    return !typeMismatch ? (<ErrorBlock>Not a valid email address</ErrorBlock>) : <div></div>;
  }

  renderConflictErrorBlock() {
    return this.props.exists ? (<ErrorBlock>Username already in use</ErrorBlock>) : <div></div>;
  }
}

export default connectToStores(RegistrationView);
