import React, {Component, PropTypes} from 'react';
export default class ErrorPanel extends Component {
  render() {

    const {error} = this.props;

    return (
      <div className="panel panel-danger">
        <div className="page-body">
          {JSON.stringify(error)}
        </div>
      </div>
    );
  }
}

ErrorPanel.propTypes = {
  error: PropTypes.object
};