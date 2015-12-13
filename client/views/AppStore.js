import alt from '../alt';
import AppActions from './AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.state = {
      username: "",
      isAuthenticated: false,
      fetching: false,
      error: null
    };
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
      username: "",
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
