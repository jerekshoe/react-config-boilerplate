// Third Party imports
import React, { Component, PropTypes } from 'react';

// Project imports
import './style.scss';

class App extends Component {
  render() {
    return (
      <div>
        Hello, World
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
