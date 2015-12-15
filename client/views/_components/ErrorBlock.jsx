import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import TweenMax from 'gsap';

export default class ErrorBlock extends Component {

  componentDidMount() {
    let node = ReactDOM.findDOMNode(this);

    TweenMax.from(node, .5, {opacity: 0, y: "-10"});
  }

  render() {
    return (
      <div className={"error-block"}>
        {this.props.children}
      </div>
    );
  }
}
