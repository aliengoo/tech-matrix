import React, {Component, PropTypes} from 'react';
import AppStore from './AppStore';
import AppActions from './AppActions';
import Navbar from './_components/Navbar.jsx';

export default class App extends Component {
  static getStores() {
    return [AppStore];
  }

  static getPropsFromStores() {
    return AppStore.getState();
  }

  render() {
    return (
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
}