import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class NotRegisteredYet extends Component {
  render() {
    return (
      <div className="panel panel-info NotRegisteredYet">
        <div className="panel-body">

          <header>
            <h3>Not registered yet?</h3>
          </header>
          <p>Click <Link to={`/registration`}>here</Link> to register.</p>
        </div>
      </div>
    );
  }
}