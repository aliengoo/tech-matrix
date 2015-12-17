import React, {Component, PropTypes} from 'react';

export default class ErrorMessage extends Component {
  render() {
    return (
      <div className="ErrorMessage">
        {this.props.children}
      </div>
    );
  }
}