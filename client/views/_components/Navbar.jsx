import React, {Component, PropTypes} from 'react';
import {Router} from 'react-router';

export default class Navbar extends Component {
  render() {

    console.log("navbar:", Router.state);

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Tech Matrix</a>
          </div>

          <ul className="nav navbar-nav">
            <li className="active">
              <a href="#">Products <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Vendors</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}