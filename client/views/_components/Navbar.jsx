import React, {Component, PropTypes} from 'react';
import {Router} from 'react-router';
import AppActions from '../AppActions';
import AppStore from '../AppStore';

export default class Navbar extends Component {

  static getStores() {
    return [AppStore]
  }

  static getPropsFromStores() {
    return AppStore.getState();
  }

  render() {

    const {isAuthenticated} = this.props;

    let menu = isAuthenticated ? this.renderMenu() : false;
    let logout = isAuthenticated ? this.renderLogout() : false;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Tech Matrix</a>
          </div>
          {menu}
          {logout}
        </div>
      </nav>
    );
  }

  renderMenu() {
    return (
      <ul className="nav navbar-nav">
        <li className="active">
          <a href="#">Products <span className="sr-only">(current)</span></a></li>
        <li><a href="#">Vendors</a></li>
      </ul>
    );
  }

  renderLogout() {
    return (
      <div className="nav navbar-nav navbar-right">
        <button className="btn btn-primary" onClick={AppActions.logoutUser}>Logout</button>
      </div>
    );
  }
}