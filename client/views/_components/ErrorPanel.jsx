import _ from 'lodash';

import React, {Component, PropTypes} from 'react';
export default class ErrorPanel extends Component {

  constructor(props) {
    super(props);
    this.componentName = this.constructor.name;
    this.hash = undefined;
  }

  render() {

    const {error, hash} = this.props;

    if (!error || (this.hash !== undefined && hash !== this.hash)) {
      return <div></div>;
    }

    let content;

    if (_.isString(error)) {
      content = error;
    } else {
      content = JSON.stringify(error);
    }

    this.hash = hash;

    return (
      <div className={`${this.componentName} alert alert-danger`} role="alert">
        {content}
      </div>
    );
  }
}

ErrorPanel.propTypes = {
  hash: PropTypes.string,
  error: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ])
};