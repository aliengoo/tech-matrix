import alt from '../alt';
import AppActions from './AppActions';

const DefaultState = {
  username: "",
  isAuthenticated: false,
  fetching: false,
  error: null
};

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.state = Object.assign({}, DefaultState);
  }

  onReset() {
    this.setState(Object.assign({}, DefaultState));
  }

  onSetError(error) {
    this.setState({
      error
    });
  }

  onClearError() {
    this.setState({
      error: null
    });
  }

  onFetchStarted() {
    this.setState({
      fetching: true
    });
  }

  onFetchEnded() {
    this.setState({
      fetching: false
    });
  }


  onSuccessfulAuthentication(username) {
    this.setState({
      fetching: false,
      username,
      isAuthenticated: true
    });
  }

  onFailedAuthentication(error) {
    this.setState({
      fetching: false,
      isAuthenticated: false,
      error
    });
  }

  onLogoutUser() {
    this.setState({
      fetching: true
    });
  }

  onLoggedOut() {
    this.setState({
      username: "",
      isAuthenticated: false
    });
  }
}

export default alt.createStore(AppStore);
