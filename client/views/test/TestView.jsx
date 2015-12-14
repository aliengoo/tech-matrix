import React, {Component, PropTypes} from 'react';

export default class TestView extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <header>
            <h1>
              Test
            </h1>
          </header>

          <button className="btn btn-primary" onClick={() => {this.props.history.pushState(null, '/login')}}>Go to login</button>

        </div>


      </div>
    );
  }
}