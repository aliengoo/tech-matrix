import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ErrorMessage from './ErrorMessage.jsx';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

export default class Errors extends Component {

  constructor(props) {
    super(props);

    this._getErrorMessages = this._getErrorMessages.bind(this);
  }

  render() {
    let errorMessages = this._getErrorMessages();

    if (errorMessages.length === 0) {
      return <div></div>;
    }

    return (
      <div className="Errors">
        <ReactCSSTransitionGroup
          transitionName="errors"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {errorMessages.map((errorMessage, i) => {
            return <ErrorMessage key={i}>{errorMessage}</ErrorMessage>
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  _getErrorMessages() {
    const {validityState, errorMessagesMap} = this.props;

    let errorMessages = [];

    if (!validityState || !errorMessagesMap || validityState.valid) {
      return errorMessages;
    }

    for (var key in validityState) {
      if (validityState[key] === true && errorMessagesMap.hasOwnProperty(key)) {
        errorMessages.push(errorMessagesMap[key]);
      }
    }

    return errorMessages;
  }
}

Errors.propTypes = {
  validityState: PropTypes.object,
  errorMessagesMap: PropTypes.object
};
