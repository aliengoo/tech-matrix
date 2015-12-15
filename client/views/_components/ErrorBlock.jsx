import React, {Component, PropTypes} from 'react';

export default class ErrorBlock extends Component {
  render() {
    return (<span className={"error-block " + (this.props.hasError ? "" : "hidden")}>{this.props.children}</span>);
  }
}

ErrorBlock.propTypes = {
  hasError: PropTypes.bool
};