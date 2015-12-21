import React, {Component, PropTypes} from 'react';
import connectToStores from 'alt/utils/connectToStores';

class AboutView extends Component {
  constructor(props) {
    super(props);
    console.log("loaded");
  }

  render() {
    return (
      <div className="container">
        <div className="col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
          <header>
            <h1>
              About
            </h1>
          </header>
        </div>
      </div>
    );
  }
}

export default AboutView;