import React, {Component, PropTypes} from 'react';

import Navbar from './_components/Navbar.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
}